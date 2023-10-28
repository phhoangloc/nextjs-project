
import { NextApiRequest, NextApiResponse } from "next"
import connectMongoDB from "@/connect/database/mogoseDB"
const formidable = require('formidable');
const fs = require('fs');

const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: 'drzg5rycu',
    api_key: '747243341311463',
    api_secret: '1i01c91b6VnudsR2Y04PFQGYF3Q',
    secure: true,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const Image =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        let method = req.method
        let path = req.query.path
        connectMongoDB()

        switch (method) {
            case 'POST':
                const form = new formidable.IncomingForm();
                form.parse(req, async (err: Error, fields: any, files: any) => {
                    const file = files && files.file;
                    // console.log(file)
                    cloudinary.v2.uploader.upload(file[0].filepath,
                        { public_id: path + "/" + file[0].originalFilename.split('.')[0] },
                        (err: Error, result: any) => {
                            if (err) {
                                console.log(err)
                            } else {
                                // console.log(result.url)
                                res.json(result)
                            }
                        }
                    )
                })
                break
            default:
                res.json("your method is not supplied")
        }

    }

export default Image