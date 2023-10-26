
import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import { blogModel } from "@/model/blog.model"
import connectMongoDB from "@/connect/database/mogoseDB"
import { isDataType } from "@/type/resultType"

const jwt = require('jsonwebtoken')

const Blog =
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
        const user = await userModel.findOne({ "_id": id }, "blogs")
        const blogs = await blogModel.find({ "author": id })
            .find(query.id ? { "_id": query.id } : {})
            .find(query.search ? { "name": { $regex: query.search } } : {})
            .find(query.author ? { "author": query.author } : {})
            .sort(query.sort ? query.sort : {})
            .limit(query.limit ? query.limit : {})
        switch (method) {
            case 'GET':
                if (id) {
                    if (blogs.length !== 0) {
                        result.success = true
                        result.data = blogs
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
                if (id) {
                    body.author = id
                    await blogModel.create(body)
                        .catch((error: Error) => {
                            result.success = false
                            result.message = error.message
                            res.send(result)
                            throw error.message
                        }).then(async (data: any) => {
                            const newblog = [...user.blogs, data.id]
                            await userModel.updateOne({ "_id": id }, { "blogs": newblog })
                            result.success = true
                            result.message = "your blog is created"
                            res.json(result)
                        })
                } else {
                    result.success = false
                    result.message = "you dont have permission"
                    res.json(result)
                }
                break
            case "PUT":
                if (id) {
                    await blogModel.updateOne({ "_id": query.id }, body)
                        .catch((err: Error) => {
                            result.success = false
                            result.message = err.message
                            res.json(result)
                        })
                        .then(async (data: any) => {
                            result.success = true
                            result.message = "you have update a book!"
                            res.json(result)
                        })
                } else {
                    result.success = false
                    result.message = "you dont have permission"
                    res.json(result)
                }
                break
            case "DELETE":
                if (id) {
                    await blogModel.deleteOne({ "_id": query.id })
                        .catch((err: Error) => {
                            result.success = false
                            result.message = err.message
                            res.json(result)
                        })
                        .then(async (data: any) => {
                            const newBlog = user.blogs.filter((item: any) => item._id.toString() !== query.id?.toString())
                            await userModel.updateOne({ "_id": id }, { "blogs": newBlog })
                            result.success = true
                            result.message = "you have deleted a blog!"
                            res.json(result)
                        })
                } else {
                    result.success = false
                    result.message = "you dont have permission"
                    res.json(result)
                }
                break
            default:
                res.send("your method is not supplied")
        }
    }

export default Blog