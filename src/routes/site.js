const express = require('express');
const router = express.Router();
const SiteController = require('../app/controllers/SiteController');
const CheckLogin = require('../app/middlewares/CheckLogin');

router.get('/', SiteController.showHeader);
router.get('/home/:slug',CheckLogin.CheckLogged, SiteController.Home);
router.get('/home',CheckLogin.CheckLogged, SiteController.Home);
router.get('/cart',CheckLogin.CheckLogged, SiteController.Cart);
router.get('/login',SiteController.logIn);
router.post('/home',CheckLogin.CheckLogged,SiteController.Home);
router.post('/backLogin',SiteController.BackLogin);
router.get('/signup',SiteController.signUp);

module.exports = router;