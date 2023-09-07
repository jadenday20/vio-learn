const baseURL = "https://musicclass.onrender.com/";

function login() {
  location.href = baseURL + `login`;
}

function getStarted() {
  if (localStorage.getItem("studentID")) {
    location.href = "./practice.html";
  } else {
    location.href = "./account.html";
  }
}
