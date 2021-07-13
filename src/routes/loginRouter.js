const router = require('express').Router();
const {
    register,
    login,
    changePass,
    logout,
    verifyEmail,
    mailtoChangePass,
    verifyEmailToChangePassword,
    addUserProject,
} = require('../controller/loginController');
// const { checkAccount } = require("../middleware/auth")
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/:id/:email/:code', verifyEmail);

router.post('/mailtoChangePass', mailtoChangePass);
router.get('/changePass/:id/:email/:code', verifyEmailToChangePassword);
router.get('/formchangepass/:id',(req, res)=>{
    res.render('changepass.ejs');
})

router.put('/formchangepass/:id', changePass);
// router.put('/user/project/:idUser/:idProject', addUserProject);

module.exports = router;
