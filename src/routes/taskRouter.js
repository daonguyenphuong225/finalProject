const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');

router.get('/task',taskController.getList)
router.post('/task',taskController.createTask)
router.put('/update-task',taskController.updateTask)

module.exports = router