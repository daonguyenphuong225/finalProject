const loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", function(e) {
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
            console.log(data);
            if (data.token)
                if (check) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.id);
                    window.location.href = "/api/task/" + data.id;
                } else {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("id", data.id);
                    window.location.href = "/api/task/" + data.id;
                }
        })
        .catch((error) => console.log(error));
});
const signupSubmit = document.getElementById("signupSubmit");
signupSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    const username = document.getElementById("usernameSignup").value;
    const password = document.getElementById("passwordSignup").value;
    const passwordConfirm = document.getElementById("confirmPassword").value;
    if (password != passwordConfirm) alert("password did'n not match");
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