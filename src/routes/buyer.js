const express = require('express');
const router = express.Router();
const BuyerController = require('../app/controllers/BuyerController');
const Feedback = require('../app/middlewares/CheckEmail');//isCheckEmail

router.get('/forgot_password', BuyerController.forgotPassword);
router.post('/reset', Feedback, BuyerController.resetPassword);
router.get('/reset', Feedback, BuyerController.resetPassword);


module.exports = router;