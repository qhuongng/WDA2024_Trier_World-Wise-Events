const a = document.querySelector("#eyeicon");
const b = document.querySelector("#psw");

document.querySelector("#eyeicon").addEventListener("click", function () {
  const type = b.getAttribute("type") === "password" ? "text" : "password";
  b.setAttribute("type", type);
  if (type === "password") {
    a.src = "eye-close.png";
  } else {
    a.src = "eye-open.png";
  }
});
