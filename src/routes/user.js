const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const CheckLogin = require('../app/middlewares/CheckLogin');

router.get('/account/profile',CheckLogin.CheckLogged,UserController.profile);
router.get('/account/password',UserController.passwrod);
router.put('/account/edit',UserController.edit);
router.put('/account/editPassword',UserController.editPassword);

module.exports = router;