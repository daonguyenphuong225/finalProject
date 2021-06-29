const TaskModel = require('../model/taskSchema')
const UserModel = require('../model/user')

exports.getList = async function (req, res) {

  try {
    let id = req.params.id
    let userName=""
    
    let data = await TaskModel.find({}).sort({ "priority": 1 })
    let users = await UserModel.find()
    for(user of users){
        if(user._id == id){
            userName = user.username
        }
    }
    let listData = {
        users: users,
        userName: userName,
        listData: data,
        listStatus: [
            {
                title: 'To Do',
                value: 'toDo'
            },
            {
                title: 'Doing',
                value: 'doing'
            },
            {
                title: 'Done',
                value: 'done'
            }
        ]
    }
    res.render('task.ejs', listData)

  } catch (error) {
      
  }
}

exports.createTask = function (req, res) {
    let data = req.body

    TaskModel.create({
        title: data.title,
        priority: data.priority,
        status: data.status,

    })
        .then((data) => {
            console.log(data);
            res.json('Tạo task thành công')
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.updateTask = function (req, res) {
    let { id, title, status, priority } = req.body

    TaskModel.updateOne({ _id: id }, { title: title, status: status, priority: priority })
        .then((data) => {
            res.json('Update task thành công')
        })
        .catch((err) => {
            res.json(err)
        })
}
exports.deleteTask = function (req, res) {
    let id = req.body.id
    TaskModel.deleteOne({ _id: id })
        .then((data) => {
            res.json('Delete task thành công')
        })
        .catch((err) => {
            res.json(err)
        })
}