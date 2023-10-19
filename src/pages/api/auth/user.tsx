
import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
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

        connectMongoDB()
        const authorization = req.headers['authorization']
        const token = authorization && authorization.split(" ")[1]
        const id = await jwt.verify(token, 'secretToken').id
        switch (method) {
            case 'GET':
                await userModel.findOne({ "_id": id })
                    .catch((error: Error) => {
                        result.success = false
                        result.message = error.message
                        res.json(result)
                    })
                    .then((data: any) => {
                        result.success = true
                        result.message = "your user is queried!"
                        result.data = data
                        res.json(result)
                    });

            case "PUT":
                await userModel.updateOne({ "_id": id }, body)
                    .catch((error: Error) => {
                        result.success = false
                        result.message = error.message
                        res.json(result)
                    })
                    .then((data: any) => {
                        result.success = true
                        result.message = "your user is updated!"
                        res.json(result)
                    });
                break

            default:
                res.send("your method is not supplied")
        }
    }

export default User