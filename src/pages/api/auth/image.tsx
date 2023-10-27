
import { NextApiRequest, NextApiResponse } from "next"
import connectMongoDB from "@/connect/database/mogoseDB"
const formidable = require('formidable');
const fs = require('fs');

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
        let pathname = req.query.pathname

        connectMongoDB()

        switch (method) {
            case 'POST':
                const form = new formidable.IncomingForm();
                form.parse(req, async (err: Error, fields: any, files: any) => {

                    if (err) {
                        throw err
                    } else {
                        const file = files && files.file;
                        const newpathname = pathname ? pathname : ""
                        const uploadDir = `public/${newpathname}/`
                        const newPath = uploadDir + file[0].originalFilename;
                        const path = `/${newpathname}/` + file[0].originalFilename;
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir);
                        }
                        const data = fs.readFileSync(file[0].filepath);

                        fs.writeFileSync(newPath, data);

                        await fs.unlinkSync(file[0].filepath);

                        res.json(path)
                    }
                })
                break
            default:
                res.json("your method is not supplied")
        }

    }

export default Image