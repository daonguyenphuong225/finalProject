const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
    user: String,
    project: String
},{timestamps: true},{collection:'tasks'})

let TaskModel = mongoose.model('tasks',taskSchema);

module.exports = TaskModel;