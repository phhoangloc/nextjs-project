import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { blogModel } from '@/model/blog.model'
import { isDataType } from '@/type/resultType'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let body: isDataType = { success: false }

    const query = req.query

    connectMongoDB()

    await blogModel.find({})
        .find(req.query.slug ? { "slug": req.query.slug } : {})
        .find(query.search ? { "title": { $regex: query.search } } : {})
        .sort(query.sort ? query.sort : {})
        .limit(query.limit ? query.limit : {})
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