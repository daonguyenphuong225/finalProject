const { config } = require("dotenv");

const loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(123);
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    let check = document.getElementById("checkbox").checked;
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
            console.log(data)
            if (data.token)
                if (check)
                    localStorage.setItem("token", data.token)
                else
                    sessionStorage.setItem("token", data.token);
            window.location.href = "/api/task"
        })
        .catch((error) => console.log(error));

    // fetch("/api")                                //api get cai gi do co trong tuong lai
    //     .then((data) => data.json())
    //     .then((data) => console.log(data));
});
const signupSubmit = document.getElementById("signupSubmit");
signupSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    const username = document.getElementById("usernameSignup").value;
    const password = document.getElementById("passwordSignup").value;
    const passwordConfirm = document.getElementById("confirmPassword").value;
    if (password != passwordConfirm) alert("password didn't match");

    else {
        fetch("/api/register", {
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
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }
});