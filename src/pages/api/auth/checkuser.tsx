import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import connectMongoDB from "@/connect/database/mogoseDB"
import { isDataType } from "@/type/resultType"


const CheckUser =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        const query = req.query
        const result: isDataType = { success: false }
        connectMongoDB()
        await userModel
            .findOne(query.username ? { "username": query.username } : {})
            .findOne(query.email ? { "email": query.email } : {})
            .catch((error: Error) => {
                result.success = false
                res.json(false)
            })
            .then((data: any) => {
                if (data) {
                    res.json(true)
                } else {
                    res.json(false)
                }

            })
    }

export default CheckUser