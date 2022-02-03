
class BuyerController {

    forgotPassword(req, res, next) {
        res.render('Buyer/forgotPassword', {
            title: 'NQ | Quên mật khẩu',
            script: 'forgotPass',
            container: 'add'
        })
    }
    resetPassword(req, res, next) {
        
        res.render('Buyer/reset', {
            title: 'NQ | Forgot Password',
            container: 'confirmEmail',
            buyer: req.body,
            script: 'confirmEmail',
            signUped: true,
        })
    }
};

module.exports = new BuyerController();
