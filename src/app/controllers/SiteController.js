const isLogin = require('../models/logIn');
const Products = require('../models/Products');
const {mutipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');
const jwt = require('jsonwebtoken');

class SiteController {
    showHeader(req, res) {
        const ID = req.cookies.SSIDG;
        if(ID) res.clearCookie('SSIDG');
        res.render('body', {
            container: 'body',
            signup: true,
            outsite:true,
            title: 'ShopNQ'
        });

    }
    logIn(req, res) {
        res.render('login', {
            container: 'login',
            script: 'login',
            title: 'Đăng nhập'
        });
    }   

    //[POST] 
    BackLogin(req, res, next) { 
        const login = new isLogin(req.body);
        const { fullname, email, password } = req.body;
        const token = jwt.sign(
            { fullname, email, password },
            process.env.JWT_SECRET,
            { expiresIn: '151d' }
        );
        res.cookie('Token', token, {
            expires: new Date(Date.now() + 12960000000)
        })
        login
            .save()
            .then(() => res.render('backLogin', {
                signUped: true,
                container: 'add'
            }))
            .catch(next);
    }
    //[GET] /signup
    signUp(req, res, next) {
        res.render('signup', {
            container: 'signup',
            script: 'signup',
            title: 'Đăng ký'
        });
    }
    //[GET] /home
    Home(req, res,next) {
        
        Products.find({})
            .skip((req.query.page-1)*25)
            .limit(25)
            .then(products => {
                res.render('products/showProducts', {
                    signup: true,
                    logged: true,
                    title: 'Home',
                    script: 'home',
                    user1: req.user,
                    user2: req.body,
                    container:'products/home',
                    home:true,
                    products:mutipleMongooseToObject(products),
                    back:null
                })
            })
            .catch(next)
    
    }

    showItem(req, res, next){
        Products.findOne({slug:req.params.slug})
        .then(products => {
            res.render('products/item',{
                title:'NQ | Cart',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/item',
                back:'home',
                product:mongooseToObject(products)
            })
        })
        .catch(next)
    }

    //Cart
    Cart(req, res, next){
        res.render('products/cart',{
            title:'NQ | Cart',
            layout:'products',
            user1: req.user,
            user2: req.body,
            logged:true,
            container:'/products/carts',
            back:'home'
        })
    }
};

module.exports = new SiteController();