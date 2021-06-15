const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');

router.get('/task/:id', taskController.getList)
router.post('/task', taskController.createTask)
router.put('/update-task', taskController.updateTask)

module.exports = router