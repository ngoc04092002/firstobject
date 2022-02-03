const isLogged = require('../models/logIn');
const passPort = require('../models/PassPort');
const { mongooseToObject } = require('../../until/mongoose');
const jwt = require('jsonwebtoken');


class UserController {
    profile(req, res) {
        const ssidg = req.cookies.SSIDG;
        const token = req.cookies.Token;
        if (ssidg) {
            const { ID } = jwt.verify(ssidg, process.env.JWT_SECRET)
            var user1 = passPort.findOne({ googleId: ID })
        }
        if (token) {
            const { fullname, email, password } = jwt.verify(token, process.env.JWT_SECRET);
            var user2 = isLogged.findOne({
                fullname: fullname,
                email: email,
                password: password
            })
        }
        Promise.all([user1, user2])
            .then(([user1, user2]) => {
                const image = user1 ? user1.Image : req.cookies._iMs || 'https://image.shutterstock.com/image-vector/initial-letter-nq-logo-simple-260nw-1967737729.jpg';
                res.render('User/profile', {
                    title: 'NQ | Profile',
                    script: '/User/profile',
                    container: '/User/profile',
                    user1: mongooseToObject(user1),
                    user2: mongooseToObject(user2),
                    image: image,
                    layout: 'profile'
                })
            })
    }

    passwrod(req, res) {
        const ssidg = req.cookies.SSIDG;
        const token = req.cookies.Token;
        if (ssidg) {
            const { ID } = jwt.verify(ssidg, process.env.JWT_SECRET)
            var user1 = passPort.findOne({ googleId: ID })
        }
        if (token) {
            const { fullname, email, password } = jwt.verify(token, process.env.JWT_SECRET);
            var user2 = isLogged.findOne({
                fullname: fullname,
                email: email,
                password: password
            })
        }

        Promise.all([user1, user2])
            .then(([user1, user2]) => {
                const image = user1 ? user1.Image : req.cookies._iMs || 'https://image.shutterstock.com/image-vector/initial-letter-nq-logo-simple-260nw-1967737729.jpg';
                res.render('User/password', {
                    title: 'NQ | Profile',
                    script: '/User/profile',
                    container: '/User/profile',
                    user1: mongooseToObject(user1),
                    user2: mongooseToObject(user2),
                    image: image,
                    layout: 'profile'
                })
            })
    }

    edit(req, res, next) {
        let idGoogle = req.cookies.SSIDG;
        if (idGoogle) {
            let imgUpdate = req.cookies._iMs;
            if (imgUpdate) {
                const { ID } = jwt.verify(ssidg, process.env.JWT_SECRET);
                passPort.updateOne({ googleId: ID }, {
                    fullname: req.body.fullname,
                    Image: imgUpdate
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
            }
        }
        if (req.body) {
            const pass = req.cookies.Token;
            const { fullname, email, password } = jwt.verify(pass, process.env.JWT_SECRET);
            isLogged.updateOne({
                fullname: fullname,
                email: email
            }, req.body)
                .then(() => {
                    const {fullname, email} = req.body
                    const token = jwt.sign(
                        { fullname, email, password },
                        process.env.JWT_SECRET,
                        { expiresIn: '151d' }
                    );
                    res.cookie('Token', token, {
                        expires: new Date(Date.now() + 12960000000)
                    })
                    return res.redirect('back');
                })
                .catch(next)
        }
    }

    editPassword(req,res,next){
        if(req.body){
            const token = req.cookies.Token;
            if (token) {
                var { fullname, email} = jwt.verify(token, process.env.JWT_SECRET);
            }
            isLogged.updateOne({
                password: req.body.oldPassword,
                fullname: fullname,
                email: email,
            },{
                password:req.body.password,
            })
            .then(()=>{
                let {password} = req.body;
                const token = jwt.sign(
                    { fullname, email, password },
                    process.env.JWT_SECRET,
                    { expiresIn: '151d' }
                );
                res.cookie('Token', token, {
                    expires: new Date(Date.now() + 12960000000)
                })
                return res.redirect('back');
            })
            .catch(next)
        }
    }
}

module.exports = new UserController();