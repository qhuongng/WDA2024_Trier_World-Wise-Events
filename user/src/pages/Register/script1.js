document.querySelector("#yes").addEventListener("click", checkRequirement);

function IsInvalidEmail(the_email) {
  var at = the_email.indexOf("@");
  var dot = the_email.lastIndexOf(".");
  var space = the_email.indexOf(" ");

  if (
    at !== -1 && //có ký tự @
    at !== 0 && //ký tự @ không nằm ở vị trí đầu
    dot !== -1 && //có ký tự .
    dot > at + 1 &&
    dot < the_email.length - 1 && //phải có ký tự nằm giữa @ và . cuối cùng
    space === -1 //không có khoẳng trắng
  ) {
    return true;
  } else {
    return false;
  }
}

function checkRequirement() {
  const x = document.querySelector("#name").value;
  const y = document.querySelector("#email").value;
  const z = document.querySelector("#phone").value;
  const t = document.querySelector("#psw").value;

  let reName = document.getElementById("reName");
  let reEmail = document.getElementById("reEmail");
  let rePhone = document.getElementById("rePhone");
  let rePass = document.getElementById("rePass");

  reName.textContent = "required";
  reEmail.textContent = "required";
  rePhone.textContent = "required";
  rePass.textContent = "required";

  if (x.length === 0) {
    reName.textContent = "Please fill out your name";
    document.querySelector("#name").select();
    return;
  }

  if (y.length === 0) {
    reEmail.textContent = "Please fill out your email";
    document.querySelector("#email").select();
    return;
  }

  if (!IsInvalidEmail(y)) {
    reEmail.textContent = "Please fill out a valid email format";
    document.querySelector("#email").select();
    return;
  }

  if (z.length === 0) {
    rePhone.textContent = "Please fill out your phone number";
    document.querySelector("#phone").select();
    return;
  }

  if (t.length === 0) {
    rePass.textContent = "Please fill out your password";
    document.querySelector("#psw").select();
    return;
  }

  alert("Thank you for your information!");
}
