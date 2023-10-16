const jwt = require('jsonwebtoken')
import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import connectMongoDB from "@/connect/database/mogoseDB"

type resultData = {
    success: boolean,
    message?: string,
    data?: any
}

const Auth =
    async (
        req: NextApiRequest,
        res: NextApiResponse<resultData>,
    ) => {
        connectMongoDB()
        let body: resultData = { success: false };
        const authorization = req.headers['authorization']
        const token = authorization && authorization.split(" ")[1]
        const id = await jwt.verify(token, 'secretToken').id
        await userModel.findOne({ "_id": id }, "infor username")
            .catch((error: Error) => {
                body.success = false,
                    body.message = error.message
                res.json(body)
            })
            .then((data: any) => {
                body.success = true
                body.message = "welcome to " + data.username;
                body.data = data
                res.json(body)
            })
    }


export default Auth