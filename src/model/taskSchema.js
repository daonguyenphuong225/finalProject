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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
      }
},{timestamps: true},{collection:'tasks'})

let TaskModel = mongoose.model('tasks',taskSchema);

module.exports = TaskModel;