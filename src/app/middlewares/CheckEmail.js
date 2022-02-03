const isLogged = require('../models/logIn');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = async function Feedback(req, res, next) {
    try {
        const { fullname, email } = req.body;
        await isLogged.findOne({
            fullname: fullname,
            email: email
        })
            .then((data) => {

                // reset New Cookies
                let TokenPre = req.cookies.Token;
                if (TokenPre) res.clearCookie('Token');
                data.password = '123456';
                let fullname = data.fullname;
                let email = data.email;
                let password = data.password;
                let token = jwt.sign(
                    { fullname, email, password },
                    process.env.JWT_SECRET,
                    { expiresIn: '151d' }
                );
                res.cookie('Token', token, {
                    expires: new Date(Date.now() + 12960000000)
                })




                return data;
            })
            .then(function (data) {
                //send mail

                let transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.USER_MAIL,
                        pass: process.env.USER_PASSWORD
                    }
                });
                transport.sendMail({
                    from: ` <${process.env.USER_MAIL}>`, // sender address
                    to: data.email, // list of receivers
                    subject: 'Quên mật khẩu', // Subject line
                    text: 'Hello',
                    html: `
                                <p>Xin chào ${data.fullname}: </p>
                                <br/>
                                <p>Mật khẩu mới của bạn:123456</p>
                                <br/>
                                <p>Hãy cẩn thận với tài khoản của bạn ^_^</p>
                            `,
                }, (err) => {
                    if (err) console.log('it has an err', err);
                    else console.log('email has send');
                });
                return data;
            })
            .then((data) => {
                //update dataUser
                const newFullname = data.fullname;
                const newEmail = data.email;
                isLogged.updateOne({
                    fullname: newFullname,
                    email: newEmail
                }, {
                    password: '123456'
                })
                    .then(() => { next() })
            })
            .catch(() => res.json('Do not have any accounts'))

    } catch (err) {
        return res.status(400).json({
            success: false,
            errors: err
        });
    }
}
