const router = require("express").Router();
const { register, login, change } = require("../controller/loginController");

router.post("/register", register);
router.post("/login", login);
router.put("/", change);
// router.get("/", async(req, res) => {
//     res.render("home", { title: home })
// })
module.exports = router;