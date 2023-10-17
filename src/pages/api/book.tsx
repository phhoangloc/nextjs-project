import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { bookModel } from '@/model/book.model'
import { isDataType } from '@/type/resultType'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let body: isDataType = { success: false }
    const query = req.query

    connectMongoDB()

    await bookModel.find({})
        .find(query.slug ? { "slug": req.query.slug } : {})
        .find(query.name ? { "name": query.name } : {})
        .find(query.search ? { "name": { $regex: query.search } } : {})
        .find(query.author ? { "author": query.author } : {})
        .sort(query.sort ? query.sort : {})
        .limit(query.limit ? query.limit : {})
        .populate("owner", "username")
        .catch((error: Error) => {
            body.success = false
            body.message = error.message
            res.json(body)
        })
        .then((data: any) => {
            body.success = true
            body.data = data
            res.json(body)

        })
}