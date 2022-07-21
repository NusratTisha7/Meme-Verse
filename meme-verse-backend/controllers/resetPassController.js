const nodemailer = require('nodemailer')
const { User } = require('../models/userModel')
const randomstring = require("randomstring");
require('dotenv/config')
const bcrypt = require('bcrypt');

const sendResetCode = async (email, callBack) => {
    let code = randomstring.generate(7);
    try {
        const mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });

        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'Reset Password Link',
            html: '<h1>Your reset code is : ' + code + '</p>',
        };

        mail.sendMail(mailOptions, async function (err, info) {
            if (err) {
                callBack({ msg: 'err' })
            } else {
                await User.updateOne({ email: email }, { resetCode: code }).then(response => {
                    callBack({ msg: 'done' })
                })
            }
        })
    } catch (e) {
        callBack({ msg: 'err' })
    }
}


module.exports.forgotPassword = async (req, res) => {
    try {
        let email = req.body.email
        let verifyEmail = await User.findOne({ email: email })
        if (verifyEmail) {
            await sendResetCode(email, (response) => {
                msg = response.msg
                if(msg==='done'){
                    return res.status(200).send('Successful');
                }else{
                    return res.status(400).send('Something went wrong!'); 
                }
            })
        } else {
            return res.status(400).send('Email does not exist');
        }

    } catch (e) {
        return res.status(400).send('Something went wrong!');
    }
}

module.exports.checkCode = async (req, res) => {
    try {
        let code = req.body.code
        let email = req.body.email
        let checkCode = await User.findOne({ email: email },{resetCode:1})
        if (code===checkCode.resetCode) {
            return res.status(200).send('Match');
        } else {
            return res.status(400).send('The code is invalid');
        }

    } catch (e) {
        return res.status(400).send('Something went wrong!');
    }
}

module.exports.resetPassword = async (req, res) => {
     const salt = await bcrypt.genSalt(10);
     let password = await bcrypt.hash(req.body.newPass, salt);
    
    await User.findOneAndUpdate({email:req.body.email},{password:password}).then(
        response=>{
            return res.status(200).send('Password change successfully');
        }
    ).catch(e=>{
        return res.status(400).send('Something went wrong!');
    })

}


