const express = require('express');
const router = express.Router();
const CheckLogin = require('../app/middlewares/CheckLogin');
const productsController = require('../app/controllers/ProductsController');

router.get('/smartDevice',CheckLogin.CheckLogged,productsController.SmartDevice)
router.get('/houseware',CheckLogin.CheckLogged,productsController.HouseWare)
router.get('/schoolThings',CheckLogin.CheckLogged,productsController.SchoolThings)
router.get('/jewels',CheckLogin.CheckLogged,productsController.Jewel)
router.get('/Shoes',CheckLogin.CheckLogged,productsController.Shoes)
router.get('/shirts',CheckLogin.CheckLogged,productsController.Shirts)
router.get('/hats',CheckLogin.CheckLogged,productsController.Hats)
router.get('/pants',CheckLogin.CheckLogged,productsController.Pants)





module.exports = router;


