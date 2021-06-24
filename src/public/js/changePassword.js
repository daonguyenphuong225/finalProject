const btn = document.getElementById("btnChangePassword");
btn.addEventListener("click", function(e) {
    const id = sessionStorage.getItem("id")
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
})