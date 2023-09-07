const loggedOut = document.querySelector(".loggedOut");
const loggedIn = document.querySelector(".loggedIn");
var studentName = document.querySelector(".studentName");

if (localStorage.getItem("studentID")) {
  login(localStorage.getItem("studentID"), localStorage.getItem("studentName"));
}

function login(id, name) {
  localStorage.setItem("studentID", id);
  localStorage.setItem("studentName", name);
  studentName.textContent = name;

  loggedOut.classList.toggle("hidden");
  loggedIn.classList.toggle("hidden");
}

function logout() {
  localStorage.removeItem("studentID");
  localStorage.removeItem("studentName");
  loggedOut.classList.toggle("hidden");
  loggedIn.classList.toggle("hidden");
}
