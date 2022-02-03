const Products = require('../models/Products');
const {mutipleMongooseToObject} = require('../../until/mongoose');

class ProductsController{
    SmartDevice(req,res,next){
        Products.find({name:/thông minh/img})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | SmartDevice',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    HouseWare(req,res,next){
        Products.find({$or:[
                    {'name':[/nồi/img,/bếp/img,/chảo/img]},
                ]})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | House Ware',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    SchoolThings(req,res,next){
        Products.find({$or:[
                    {'name':[/sách/img,/vở/img,/bút/img,/thước/img,/compa/img]},
                ]})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | School Things',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    Jewel(req,res,next){
        Products.find({$or:[
                    {'name':[/kim cương/img,/vàng/img,/đá/img,/ngọc/img,/bạc/img]},
                ]})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | Jewels',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    Shoes(req,res,next){
        Products.find({name:/giày/img})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | Shoes',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    Shirts(req,res,next){
        Products.find({name:/áo/img})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | Shirts',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    Hats(req,res,next){
        Products.find({name:/mũ/img})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | Hats',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    }
    Pants(req,res,next){
        Products.find({name:/quần/img})
        .then((products) => {
            res.render('products/smartDevice',{
                title:'NQ | Pants',
                layout:'products',
                user1: req.user,
                user2: req.body,
                logged:true,
                container:'/products/products',
                products:mutipleMongooseToObject(products),
                back:'home'
            })
        }).catch(next)
    } 
}

module.exports = new ProductsController();