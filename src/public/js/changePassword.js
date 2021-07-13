const btn = document.getElementById("btnChangePassword");
btn.addEventListener("click", function (e) {
    const id = sessionStorage.getItem("id");
    alert("check mail")
    fetch("/api/mailtoChangePass", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            id
        }),
    })
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err)=>console.log(err));
})