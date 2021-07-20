const router = require('express').Router();
const {
    register,
    login,
    changePass,
    logout,
    verifyEmail,
    addUserProject,
    mailForgot,
    changeForgotPass,
} = require('../controller/loginController');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
// const { checkAccount } = require("../middleware/auth")
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/:id/:email/:code', verifyEmail);

router.get('/forgot', (req, res) => {
    res.render('forgot.ejs');
});
router.post('/forgot', mailForgot);

router.get('/renew', function (req, res, next) {
    res.render('enternewpass.ejs');
});
router.post('/newpass', changeForgotPass);
router.get('/changePass', (req, res) => {
    res.render('changepass');
});
router.post('/changePass', changePass);
module.exports = router;
