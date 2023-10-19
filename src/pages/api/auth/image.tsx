
import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import connectMongoDB from "@/connect/database/mogoseDB"
import { isDataType } from "@/type/resultType"
const formidable = require('formidable');
const fs = require('fs');
const jwt = require('jsonwebtoken')

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

        connectMongoDB()
        const authorization = req.headers['authorization']
        const token = authorization && authorization.split(" ")[1]
        const id = await jwt.verify(token, 'secretToken').id

        switch (method) {
            case 'POST':
                const form = new formidable.IncomingForm();
                form.parse(req, async (err: Error, fields: any, files: any) => {

                    if (err) {
                        throw err
                    } else {
                        const file = files && files.file;
                        const newpathname = 'img/avata/'
                        const uploadDir = `./public/${newpathname}`
                        const newPath = uploadDir + file[0].originalFilename;
                        const newName = newpathname + file[0].originalFilename;

                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir);
                        }

                        const data = fs.readFileSync(file[0].filepath);

                        fs.writeFileSync(newPath, data);

                        await fs.unlinkSync(file[0].filepath);
                    }
                })
            default:
                res.send("your method is not supplied")
        }
    }

export default Image