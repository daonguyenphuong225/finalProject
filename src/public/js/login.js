const loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    let check = document.getElementById("checkbox").checked; //remember
    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((data) => data.json())
        .then((data) => {
            if (data.status) {
                Command: toastr["warning"](data.status);

                toastr.options = {
                    closeButton: false,
                    debug: false,
                    newestOnTop: false,
                    progressBar: false,
                    positionClass: "toast-top-right",
                    preventDuplicates: false,
                    onclick: null,
                    showDuration: "300",
                    hideDuration: "1000",
                    timeOut: "5000",
                    extendedTimeOut: "1000",
                    showEasing: "swing",
                    hideEasing: "linear",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                };
            }
            if (data.token)
                if (check) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.id);
                    sessionStorage.setItem("id", data.id);
                    window.location.href = "/project/";
                } else {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("id", data.id);
                    sessionStorage.setItem("username",data.username);
                    window.location.href = "/project/";
                }
        })
        .catch((error) => console.log(error));
});
const signupSubmit = document.getElementById("signupSubmit");
signupSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    const username = document.getElementById("usernameSignup").value;
    const email = document.getElementById("emailSignup").value;
    const password = document.getElementById("passwordSignup").value;
    const passwordConfirm = document.getElementById("confirmPassword").value;
    if (password != passwordConfirm) {
        Command: toastr["warning"]("password không trùng");

        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
        };
    }
    else {
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data.status) {
                    Command: toastr["warning"](data.status);

                    toastr.options = {
                        closeButton: false,
                        debug: false,
                        newestOnTop: false,
                        progressBar: false,
                        positionClass: "toast-top-right",
                        preventDuplicates: false,
                        onclick: null,
                        showDuration: "300",
                        hideDuration: "1000",
                        timeOut: "5000",
                        extendedTimeOut: "1000",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut",
                    };
                }
                if (data.message) {
                    Command: toastr["success"](data.message);

                    toastr.options = {
                        closeButton: false,
                        debug: false,
                        newestOnTop: false,
                        progressBar: false,
                        positionClass: "toast-top-right",
                        preventDuplicates: false,
                        onclick: null,
                        showDuration: "300",
                        hideDuration: "1000",
                        timeOut: "5000",
                        extendedTimeOut: "1000",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut",
                    };
                }
            })
            .catch((error) => console.log(error));
    }
});