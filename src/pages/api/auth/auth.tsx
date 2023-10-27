import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import connectMongoDB from "@/connect/database/mogoseDB"
import { isDataType } from "@/type/resultType"

const jwt = require('jsonwebtoken')

const Auth =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        connectMongoDB()
        let body: isDataType = { success: false };
        const authorization = req.headers['authorization']
        const token = authorization && authorization.split(" ")[1]
        const id = await jwt.verify(token, 'secretToken').id
        await userModel.findOne({ "_id": id }, "infor username books blogs")
            // .populate("books", "name")
            // .populate("blogs", "title")
            .catch((error: Error) => {
                body.success = false
                body.message = error.message
                res.json(body)
            })
            .then((result: any) => {
                body.success = true
                body.message = "welcome!"
                body.data = result
                res.json(body)
            })
    }


export default Auth