$(document).ready(function () {

    $('.create-task-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().val();
        let status = $(this).siblings().val();
        let user = 1242352523;
        let project = "aczb123";

        $.ajax({
            url: '/api/task',
            type: 'POST',

            data: {
                title: title,
                status: status,
                user: user,
                project: project
            }
        })
            .then((data) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
    })

    $('.content-btn').click(function () {
        let title = $(this).children().eq(0).text()
        let id = $(this).children().eq(1).val()
        $('.update-title-input').val(title)
        $('.update-id-input').val(id)
    })

    $('.update-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().eq(0).val()
        let status = $(this).siblings().eq(0).val()
        let id = $(this).parent().siblings().eq(1).children().eq(1).val()

        callAjax(id,title,status)
    })
    $('.move-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().eq(0).val()
        let status = $(this).siblings().eq(0).val()
        let id = $(this).parent().siblings().eq(1).children().eq(1).val()
        if(status == 'toDo'){
            status = 'doing'
        }else{
            status = 'done'
        }
        callAjax(id,title,status)
    })
    $('.moveBack-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().eq(0).val()
        let status = $(this).siblings().eq(0).val()
        let id = $(this).parent().siblings().eq(1).children().eq(1).val()
        if(status == 'doing'){
            status = 'toDo'
        }else{
            status = 'doing'
        }
        callAjax(id,title,status)
    })

    function callAjax(id,title, status) {
        $.ajax({
            url: '/api/update-task',
            type: 'PUT',
            data: {
                id: id,
                title: title,
                status: status
            }
        })
            .then((data) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
    }


});
