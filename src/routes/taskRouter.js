const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');
const { checkAccount } = require("../middleware/auth")

router.get('/task/:id', checkAccount, taskController.getList)
router.post('/task', taskController.createTask)
router.post('/task/add-user', taskController.addUser)
router.put('/update-task', taskController.updateTask)
router.delete('/update-task', taskController.deleteTask)

module.exports = router