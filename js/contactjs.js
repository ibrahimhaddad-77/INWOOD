var userName = document.getElementById("usName");
var userEmail = document.getElementById("email");
var subject = document.getElementById("subject");
var btnSend = document.getElementById("send");
var message = document.getElementById("mess");

userName.addEventListener("keyup", function () {
  if (userName.value.length > 3 && userName.value.length < 20) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");
  } else {
    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");
  }
});

userEmail.addEventListener("keyup", function () {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailPattern.test(userEmail.value)) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");
  } else {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");
  }
});

btnSend.addEventListener("click", function () {
  userName.value = "";
  userEmail.value = "";
  subject.value = "";
  message.value = "";
  document.getElementById("vaild").style.display = "none";
  document.getElementById("invaild").style.display = "none";
});
