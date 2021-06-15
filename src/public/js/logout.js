document.getElementById("logoutBtn").addEventListener("click", function(e) {
    window.location.href = "/api/logout"
    localStorage.clear();
    sessionStorage.clear();
});