$('.card').click(function(e) {
    $.ajax({
            url: '/project/:projectId',
            type: 'GET',

        })
        .then((data) => {
            window.location.href = "/task/" + data.Project
        })
        .catch((err) => {
            console.log(err)
        })
})