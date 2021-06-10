const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    priority:{
        type: Number,
        required: true,
        trim: true,
        enum : [0,1,2]
    },
    status:{
        type: String,
        required: true,
        trim: true,
        enum : ['toDo','doing','done']
    },
    user: String,
    project: String
},{timestamps: true},{collection:'tasks'})

let TaskModel = mongoose.model('tasks',taskSchema);

module.exports = TaskModel;