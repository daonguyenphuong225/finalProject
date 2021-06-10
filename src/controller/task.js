const TaskModel = require('../model/taskSchema')

exports.getList = function (req, res) {

    TaskModel.find({}).sort({"priority" :1})
        .then(function (data) {
            let listData = {
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
        })
        .catch(function (err) {
            console.log(err);
        })
}

exports.createTask = function(req,res){
    let data = req.body
    TaskModel.create(data)
    .then((data)=>{
        res.json('Tạo task thành công')
    })
    .catch((err)=>{
        res.json(err)
    })
}

exports.updateTask = function(req,res){
    let {id,title,status,priority} = req.body
    
    TaskModel.updateOne({_id:id},{title:title, status:status,priority:priority})
    .then((data)=>{
        res.json('Update task thành công')
    })
    .catch((err)=>{
        res.json(err)
    })
}