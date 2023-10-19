
import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import { bookModel } from "@/model/book.model"
import connectMongoDB from "@/connect/database/mogoseDB"
import { isDataType } from "@/type/resultType"

const jwt = require('jsonwebtoken')

const User =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {

        let result: isDataType = { success: false };
        let method = req.method
        let body = req.body
        let query = req.query

        connectMongoDB()

        const authorization = req.headers['authorization']
        const token = authorization && authorization.split(" ")[1]
        const id = await jwt.verify(token, 'secretToken').id
        const user = await userModel.findOne({ "_id": id }, "books")
        const books = await bookModel.find({ "owner": id })
            .find(query.id ? { "_id": query.id } : {})
            .find(query.search ? { "name": { $regex: query.search } } : {})
            .find(query.author ? { "author": query.author } : {})
            .sort(query.sort ? query.sort : {})
            .limit(query.limit ? query.limit : {})
        switch (method) {
            case 'GET':
                if (id) {
                    if (books.length !== 0) {
                        result.success = true
                        result.data = books
                        res.json(result)
                    } else {
                        result.success = false
                        result.message = "no result"
                        res.json(result)
                    }
                } else {
                    result.success = false
                    result.message = "you dont have permission"
                    res.json(result)
                }
                break
            case 'POST':
                body.owner = id
                await bookModel.create(body)
                    .catch((error: Error) => {
                        result.success = false
                        result.message = error.message
                        res.send(result)
                        throw error.message
                    }).then(async (data: any) => {
                        const newbook = [...user.books, data.id]
                        await userModel.updateOne({ "_id": id }, { "books": newbook })
                        result.success = true
                        result.message = "your book is created"
                        res.json(result)
                    })
                break
            case "PUT":
                break
            case "DELETE":
                if (id) {
                    await bookModel.deleteOne({ "_id": query.id })
                        .catch((err: Error) => {
                            result.success = false
                            result.message = err.message
                            res.json(result)
                        })
                        .then(async (data: any) => {
                            const newbook = user.books.filter((item: any) => item._id.toString() !== query.id?.toString())
                            console.log(newbook)
                            await userModel.updateOne({ "_id": id }, { "books": newbook })
                            result.success = true
                            result.message = "you have deleted a book!"
                            res.json(result)
                        })
                } else {
                    result.success = false
                    result.message = "you dont have permission"
                    res.json(result)
                }
            default:
                res.send("your method is not supplied")
        }
    }

export default User