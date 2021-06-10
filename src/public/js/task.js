$(document).ready(function () {

    $('.create-task-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().val();
        let priority = $(this).parent().siblings().eq(1).children().eq(2).val();
        if (priority == null) {
            alert("you need confirm priority ")
        }
        let status = $(this).siblings().val();
        let user = 1242352523;
        let project = "aczb123";
        console.log(priority);

        $.ajax({
            url: '/task',
            type: 'POST',

            data: {
                title: title,
                priority: priority,
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
        let priority = $(this).children().eq(2).val()

        let id = $(this).children().eq(1).val()
        $(".update-priority option").remove()
        if (priority == 0) {
            $(".update-priority").append(`
            <option value="0" selected>High</option>
             <option value="1">Medium</option>
            <option value="2">Low</option>
            `)
        }
        if (priority == 1) {
            $(".update-priority").append(`
            <option value="0" >High</option>
             <option value="1" selected>Medium</option>
            <option value="2">Low</option>
            `)
        }
        if (priority == 2) {
            $(".update-priority").append(`
            <option value="0" >High</option>
             <option value="1">Medium</option>
            <option value="2" selected>Low</option>
            `)
        }
        $('.update-title-input').val(title)
        $('.update-id-input').val(id)
    })

    $('.update-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().eq(1).val()
        let status = $(this).siblings().eq(0).val()
        let id = $(this).parent().siblings().eq(1).children().eq(3).val()
        let priority = $(this).parent().siblings().eq(1).children().eq(5).val()
        callAjax(id, title, status,priority)
    })
    $('.move-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().eq(1).val()
        let status = $(this).siblings().eq(0).val()
        let id = $(this).parent().siblings().eq(1).children().eq(3).val()
        let priority = $(this).parent().siblings().eq(1).children().eq(5).val()
        if (status == 'toDo') {
            status = 'doing'
        } else {
            status = 'done'
        }
        callAjax(id, title, status,priority)
    })
    $('.moveBack-btn').click(function () {
        let title = $(this).parent().siblings().eq(1).children().eq(1).val()
        let status = $(this).siblings().eq(0).val()
        let id = $(this).parent().siblings().eq(1).children().eq(3).val()
        let priority = $(this).parent().siblings().eq(1).children().eq(5).val()
        if (status == 'doing') {
            status = 'toDo'
        } else {
            status = 'doing'
        }
        callAjax(id, title, status,priority)
    })

    function callAjax(id, title, status,priority) {
        $.ajax({
            url: '/update-task',
            type: 'PUT',
            data: {
                id: id,
                title: title,
                status: status,
                priority: priority
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
