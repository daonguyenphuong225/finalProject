$(document).ready(function() {

        
    let username = sessionStorage.getItem("username");
    let userId = sessionStorage.getItem("id");
     $('#headerUsername').html(username)
    $('input[name=userId]').val(userId)
    $('#AdminName').html(`Admin: ${username}`)

    

    $(".add-user-btn").click(function(){
       let userId = $('#addUser').val()
       let projectId = $('#projectId').val()
       $.ajax({
        url: '/task/add-user',
        type: 'POST',

        data: {
            userId:userId,
            projectId:projectId
        }
    })
        .then((data) => {
            location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    })

    $('.navbar-toggler').click(function(){
        $('.navbar').toggleClass('z-index-class')
    })
    $('.create-task-btn').click(function() {
        let title = $(this).parent().siblings().eq(1).children().val();
        let priority = $(this).parent().siblings().eq(1).children().eq(3).val();
        let status = $(this).siblings().val();
        let userId =  $(this).parent().siblings().eq(1).children().eq(2).val();
        let projectId =  $(this).parent().siblings().eq(1).children().eq(4).val();

        if (priority && title) {
            $.ajax({
                url: '/task',
                type: 'POST',
    
                data: {
                    title: title,
                    priority: priority,
                    status: status,
                    userId: userId,
                    projectId:projectId
                }
            })
                .then((data) => {
                    location.reload();
                })
                .catch((err) => {
                    console.log(err)
                })
        }else{
            alert("you need confirm all information ")
        }
      

        
    })

    $('.content-btn').click(function() {
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
    $('.move-btn-todo').click(function () {
        let title = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(1).val()
        let status = 'toDo'
        let id = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(3).val()
        let priority = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(5).val()
        callAjax(id, title, status,priority)

    })
   
    $('.move-btn-doing').click(function () {
        let title = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(1).val()
        let status = 'doing'
        let id = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(3).val()
        let priority = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(5).val()
        callAjax(id, title, status,priority)
    })
   
    $('.move-btn-done').click(function () {
        let title = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(1).val()
        let status = 'done'
        let id = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(3).val()
        let priority = $(this).parent().parent().parent().parent().siblings().eq(1).children().eq(5).val()
        callAjax(id, title, status,priority)
    })

    $('.delete-btn').click(function(){
        let id = $(this).parent().siblings().eq(1).children().eq(3).val()
        $.ajax({
            url: '/update-task',
            type: 'DELETE',
            data: {
                id: id,
            }
        })
            .then((data) => {
            location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
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