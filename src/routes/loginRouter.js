const router = require("express").Router();
const { register, login, changePass } = require("../controller/loginController");

router.post("/register", register);
router.post("/login", login);
router.put("/", changePass);
// router.get("/", async(req, res) => {
//     res.render("home", { title: home })
// })
module.exports = router;