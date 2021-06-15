const router = require("express").Router();
const {
    register,
    login,
    changePass,
    logout,
} = require("../controller/loginController");

router.post("/register", register);
router.post("/login", login);
router.put("/", changePass);
router.get("/logout", logout);
router.get("/login", (req, res) => {
    res.render("login.ejs");
})
module.exports = router;