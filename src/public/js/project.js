$(document).ready(function () {
  let username = sessionStorage.getItem("username");
  let userId = sessionStorage.getItem("id");
  $("#headerUsername").html(username);
  $("input[name=userId]").val(userId);

  $(".card").click(function () {
    let projectId = $(this).siblings().eq(0).val();
    $.ajax({
      url: `/task?projectId=${projectId}`,
      type: "GET",
    })
      .then((data) => {
        window.location.href = `/task?projectId=${projectId}`;
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
let userId = sessionStorage.getItem("id");
console.log(userId);

$(".btngetnew").click(function () {
  console.log($("input[name=title]").val());
  console.log($("input[name=detail]").val());
  console.log($("#stt").val());
  $.ajax({
    url: `/project`,
    type: "POST",
    data: {
      title: $("input[name=title]").val(),
      detail: $("input[name=detail]").val(),
      status: $("#stt").val(),
      userId: userId,
    },
  })
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
$(".btnsubmit").click(function () {
  let id = $(this).siblings().eq(0).val();
  $.ajax({
    url: `/project`,
    type: "PUT",
    data: {
      id,
      title,
      detail,
      status,
    },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
$(".btndelete").click(function () {
  let id = $(this).siblings().eq(0).val();

  $.ajax({
    url: `/project`,
    type: "DELETE",
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
$(".btnEdit").click(function () {
  document.querySelector(".popup").style.display = "flex";
});
$(".close").click(function () {
  document.querySelector(".popup").style.display = "none";
});
