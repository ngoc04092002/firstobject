const jwt = require('jsonwebtoken');
const isLogged = require('../models//logIn');

class CheckLogin {
    CheckLogged(req, res, next) {
        try {
            let token = req.cookies.Token;
            if (token) {
                if (req.user) {
                    const ID = req.user.id;
                    const token = jwt.sign(
                        { ID },
                        process.env.JWT_SECRET,
                        { expiresIn: '151d' }
                    );
                    res.cookie('SSIDG', token, {
                        expires: new Date(Date.now() + 12960000000)
                    })
                    next();
                }
                else {
                    const { fullname, email, password } = jwt.verify(token, process.env.JWT_SECRET);
                    req.body.fullname = fullname;
                    if (email === req.body.email && password === req.body.password) next();
                    else {
                        isLogged.findOne({
                            email: email,
                            password: password
                        })
                            .then(() => next())
                            .catch(() => res.redirect('/signup'))
                    }
                }
            } else {
                if (req.user) next();
                else res.redirect('/signup');
            }
        } catch (err) {
            return res.status(404).json('Server Fail');
        }
    }
}

module.exports = new CheckLogin(); 