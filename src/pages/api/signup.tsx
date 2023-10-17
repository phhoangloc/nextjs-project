

import { userModel } from '@/model/user.model';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isDataType } from '@/type/resultType';
import connectMongoDB from '@/connect/database/mogoseDB';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

export const transporter = nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ph.hoangloc@gmail.com', //Tài khoản gmail vừa tạo
        pass: 'trdecbcnuzkaduob' //Mật khẩu tài khoản gmail vừa tạo
    },
});

const createUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    connectMongoDB()
    if (req.method === 'POST') {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        const mahoa_password = req.body.password && bcrypt.hashSync(req.body.password.toString(), salt);
        body.password = mahoa_password
        const result: isDataType = { success: false }
        await userModel.create(body)
            .catch((error: Error) => {
                result.success = false
                result.message = error.message
                throw error.message
            })

        const mainOptions = {
            from: 'LOCKHEART (ph.hoangloc@gmail.com) <no-reply>',
            to: req.body.email,
            subject: 'Active your Account',
            html: `
            <p style="text-align:center">Thanks for you registering!<p>
            <p style="text-align:center">Please click <a style="font-weight:bold;color:green" href="${process.env.HOMEPAGE_URL}active?email=${req.body.email}">here</a> to acctive your account<p>`
        };

        await transporter.sendMail(mainOptions)
            .catch((error: Error) => {
                result.success = false
                result.message = error.message
                res.send(result)
                throw error.message
            }).then(() => {
                result.success = true
                result.message = "please check your email to active your account"
                res.json(result)
            })
    } else {
        res.json({
            success: false,
            message: "your request method is not supply"
        })
    }
}

export default createUser