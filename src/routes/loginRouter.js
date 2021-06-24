const router = require("express").Router();
const {
    register,
    login,
    changePass,
    logout,
    verifyEmail,
    mailtoChangePass,
    verifyEmailtoChangePassword
} = require("../controller/loginController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/:id/:email/:code", verifyEmail);
router.post("/mailtoChangePass", mailtoChangePass);
// router.get("/changePass/:/id/:code", verifyEmailtoChangePassword, (req, res) => {
//     res.render("/changepass.ejs");
// });
// router.put("/", changePass);
module.exports = router;