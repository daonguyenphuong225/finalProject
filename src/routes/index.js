const router = require("express").Router();

const LoginRouter = require("./loginRouter");
const ProjectRouter = require('./projectRouter');
 const TaskRouter = require('./taskRouter');

router.use("/api", LoginRouter);
router.use('/',ProjectRouter);
router.use('/',TaskRouter);

module.exports = router;