const getDaysInAmonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//generate current calendar
const currentTime = new Date();
var year = currentTime.getFullYear();
var month = currentTime.getMonth();
var day = currentTime.getDate();

document.querySelector("#month h2").textContent =
  monthList[month] + ", " + year;

const daysInCurrMonth = getDaysInAmonth(year, month);
const calendar = document.getElementById("calendar");

for (let i = 0; i < getFirstDayOfMonth(year, month); i++) {
  const blankDate = document.createElement("li");
  calendar.appendChild(blankDate);
}

for (let i = 1; i <= daysInCurrMonth; i++) {
  const li = document.createElement("li");
  const date = document.createElement("p");
  date.textContent = i;
  date.classList.add("monthDay");
  date.id = `${month}/${i}/${year}`;
  li.appendChild(date);
  calendar.appendChild(li);
}

document.getElementById(`${month}/${day}/${year}`).classList.add("currDay");

const totalElements = document.querySelectorAll("#calendar > *").length;

//fill in the rest of the empty spaces
if (totalElements <= 43) {
  var numCells = 43;
} else {
  var numCells = 50;
}
for (let i = totalElements; i < numCells; i++) {
  const blankDate = document.createElement("li");
  calendar.appendChild(blankDate);
}

function getFirstDayOfMonth(year, month) {
  var d = new Date(monthList[month] + " 1, " + year);
  d = d.getDay();
  d -= 1;
  if (d == -1) {
    d = 6;
  }
  return d;
}
