const UserModel = require('../models/userModel');
const nodemailer = require('nodemailer');

module.exports.signup = (req, res) => {
    console.log(req.body)

    const newUser = new UserModel({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    });

    newUser.save().then(() => {
        res.send({ code: 200, message: 'Signup success!'})
    }).catch((err) => {
        res.send({ code: 500, message: 'Signup error!'})
    })
}

module.exports.signin = (req, res) => {
    console.log(req.body.email)
    
    UserModel.findOne({ $or: [{email: req.body.email}, {username: req.body.username}]})
        .then(result => {
            console.log(res, '11');

            if(result.password !== req.body.password) {
                res.send({ code: 404, message: 'password wrong' })
            } else {
                res.send({ username: result.username, email: result.email, code: 200, message: 'user found', token: 'fadfhdo'})
            }
        }).catch(err => {
            res.send({ code: 500, message: 'user not found'})
        })

    /* newUser.save().then(() => {
        res.send({ code: 200, message: 'Signup success!'})
    }).catch((err) => {
            res.send({ code: 500, message: 'Signup error!'})
        }) */
}

module.exports.sendotp = async (req, res) => {

    console.log(req.body);

    const _otp = Math.floor(100000 + Math.random() * 900000);

    console.log(_otp);

    let user = await UserModel.findOne({ email: req.body.email });
    
    // send to user email
    if(!user) {
        res.send({ code: 500, message: 'user not found' })
    }

    let testAccount = await nodemailer.createTestAccount();
        
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    
    let info = await transporter.sendMail({
        from: 'kutay@gmail.com',
        to: req.body.email, // list of receivers
        subject: "OTP", // Subject line
        text: String(_otp),
        html: `<html>
            < body >
            Hello and welcome
        </ >
       </html > `,
    })
    // save in db
    if(info.messageId) {
        console.log(info, 84);

        UserModel.updateOne({ email: req.body.email }, { otp: _otp })
            .then(result => {
                res.send({ code: 200, message: 'otp sent' })
            }).catch(err => {
                res.send({ code: 500, message: 'Server error'})
            })
    } else {
        res.send({ code: 500, message: 'Server error'})
    }
}

module.exports.submitotp = (req, res) => {
    console.log(req.body);

    const otp = '5678'

    UserModel.findOne({ otp: req.body.otp }).then(result => {

        //  update the password 

        UserModel.updateOne({ email: result.email }, { password: req.body.password })
            .then(result => {
                res.send({ code: 200, message: 'Password updated' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })

            })


    }).catch(err => {
        res.send({ code: 500, message: 'otp is wrong' })

    })
}