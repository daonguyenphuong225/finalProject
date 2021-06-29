$('.card').click(function() {
    let projectId = $(this).siblings().eq(0).val()
    let userId = $(this).siblings().eq(1).val()

    $.ajax({
        url: `/task/${userId}?projectId=${projectId}`,
        type: 'GET',

    })
        .then((data) => {
            window.location.href = `/task/${userId}?projectId=${projectId}`
        })
        .catch((err) => {
            console.log(err)
        })
    
})