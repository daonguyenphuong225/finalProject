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
// console.log(userId);

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
  let id = $(this)[0].className.slice(10, 1000);
  console.log(id);
  let title = $("#edtitle").val();
  let detail = $("#eddetail").val();
  let status = $("#edstt").val();
  $.ajax({
    url: `/project`,
    type: "PUT",
    data: {
      id: id,
      title: title,
      detail: detail,
      status: status,
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
$(".btndelete").click(function () {
  let id = $(this)[0].className.slice(10, 1000);
  $.ajax({
    url: `/project`,
    type: "DELETE",
    data: {
      id: id,
    },
  })
    .then((data) => {
      window.location.reload();
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

function updateSubmit(id) {
  console.log(id);
  $(".btnsubmit").attr("class", `btnsubmit ${id}`);
  $(".btndelete").attr("class", `btndelete ${id}`);
}
