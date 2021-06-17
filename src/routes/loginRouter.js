const router = require("express").Router();
const {
    register,
    login,
    changePass,
    logout,
    verifyEmail,
} = require("../controller/loginController");

router.post("/register", register);
router.post("/login", login);
router.put("/", changePass);
router.get("/logout", logout);
router.get("/:email/:code", verifyEmail);
module.exports = router;