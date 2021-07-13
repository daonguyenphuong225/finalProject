<<<<<<< HEAD
$('.card').click(function () {
    let projectId = $(this).siblings().eq(0).val();
    let userId = $(this).siblings().eq(1).val();

    $.ajax({
        url: `/task/${userId}?projectId=${projectId}`,
        type: 'GET',
    })
        .then((data) => {
            window.location.href = `/task/${userId}?projectId=${projectId}`;
        })
        .catch((err) => {
            console.log(err);
        });
});

$('.submit').click(function () {
    let id = $(this).siblings().eq(0).val();
    // const title=document.getElementById("Title-edit").value();
    // const detail=document.getElementById("Detail-edit").value();
    // const status = document.getElementById("Status-select").value();

    $.ajax({
        url: `/project`,
        type: 'PUT',
        data: {
            id,
            title,
            detail,
            status,
        },
    })
        .then((data) => {
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
});

$('.delete').click(function () {
    let id = $(this).siblings().eq(0).val();

    $.ajax({
        url: `/project`,
        type: 'DELETE',
        data: {
            id,
        },
    })
        .then((data) => {
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
});

$('.btnEdit').click(function () {
    document.querySelector('.popup').style.display = 'flex';
});
$('.close').click(function () {
    document.querySelector('.popup').style.display = 'none';
});
=======

$(document).ready(function () {
    let username = sessionStorage.getItem("username");
    let userId = sessionStorage.getItem("id");
    $('#headerUsername').html(username)
    $('input[name=userId]').val(userId)


    $('.card').click(function () {
        let projectId = $(this).siblings().eq(0).val()
        $.ajax({
            url: `/task?projectId=${projectId}`,
            type: 'GET',

        })
            .then((data) => {
                window.location.href = `/task?projectId=${projectId}`
            })
            .catch((err) => {
                console.log(err)
            })

    })

    $('.submit').click(function () {
        let id = $(this).siblings().eq(0).val();
        // const title=document.getElementById("Title-edit").value();
        // const detail=document.getElementById("Detail-edit").value();
        // const status = document.getElementById("Status-select").value();

        $.ajax({
            url: `/project`,
            type: 'POST',
            data: {
                id,
                title,
                detail,
                status
            }
        })
            .then((data) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err)
            })

    })

    $('.delete').click(function () {
        let id = $(this).siblings().eq(0).val()

        $.ajax({
            url: `/project`,
            type: 'DELETE',
            data: {
                id
            }
        })
            .then((data) => {
                location.reload()
            })
            .catch((err) => {
                console.log(err)
            })

    })

    $(".btnEdit").click(function () {
        document.querySelector(".popup").style.display = "flex";
    })
    $(".close").click(function () {
        document.querySelector(".popup").style.display = "none";
    })




});
>>>>>>> cd4d34d7cae1de72b37b985a801569c70f95bd63
