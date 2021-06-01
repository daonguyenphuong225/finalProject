const route = require("express").Router();
const { LoginController } = require("../controller");
route.post("/register", async(req, res) => {
    const body = req.body;
    const data = await LoginController.register(body);
    console.log(data);
    res.json({
        data,
    });
});

route.post("/login", async(req, res) => {
    const body = req.body;
    const data = await LoginController.login(body);
    console.log(data);
    res.json({
        data,
    });
});
route.put("/", async(req, res) => {
    const body = req.body;
    const data = await LoginController.change(body);
    res.json({
        data,
    });
});
module.exports = route;