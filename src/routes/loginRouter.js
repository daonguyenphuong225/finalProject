const router = require("express").Router();
const {
    register,
    login,
    changePass,
    logout,
    verifyEmail,
    mailtoChangePass,
    verifyEmailtoChangePassword,
    addUserProject,
} = require("../controller/loginController");
// const { checkAccount } = require("../middleware/auth")
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/:id/:email/:code", verifyEmail);
router.post("/mailtoChangePass", mailtoChangePass);
router.put("/user/project/:idUser/:idProject", addUserProject);
// router.get("/changePass/:/id/:code", verifyEmailtoChangePassword, (req, res) => {
//     res.render("/changepass.ejs");
// });
// router.put("/", changePass);
module.exports = router;