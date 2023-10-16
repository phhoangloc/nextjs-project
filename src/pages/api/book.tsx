import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { bookModel } from '@/model/book.model'
type ResponseData = {
    message: string
}
type ResBodyType = any
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    let body: ResBodyType = {}

    connectMongoDB()

    await bookModel.find({})
        .find(req.query.slug ? { "slug": req.query.slug } : {})
        .catch((error: Error) => {
            body.success = false
            res.json(body)
            throw error.message
        })
        .then((data: any) => {
            body.success = true
            body.data = data
            res.json(body)

        })
}