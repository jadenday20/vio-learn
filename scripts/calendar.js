import {
  getPractice,
  getPracticeByDate,
  setPracticeByDate,
} from "../server.js";

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

var studentID = localStorage.getItem("studentID");
const calendarID = "calendar";

if (studentID) {
  document.getElementById("loggedOut").classList.add("hidden");

  //generate current calendar
  const currentTime = new Date();
  var year = currentTime.getFullYear();
  var month = currentTime.getMonth();

  const calendar = document.getElementById("calendar");

  var practice;

  fillCalendar(year, month, calendar, calendarID);
}

async function fillCalendar(year, month, calendar, calendarID) {
  createWeeks(calendarID);
  setMonthName(year, month);
  setArrows(year, month);
  fillBlankDays(year, month, calendar);
  var daysInMonth = getDaysInAmonth(year, month);
  fillDates(year, month, daysInMonth, calendar);
  practice = await getPractice(studentID);
  await fillPractice(year, month, daysInMonth);
  // await fillMonthDays(year, month, calendar);
  fillRemainingCalendar(calendar);
  setCurrDay();
}

function createWeeks(calendarID) {
  let calendar = document.getElementById(calendarID);
  calendar.innerHTML = `<li id="month">
  <h2></h2>
</li>
<li class="weekday">Monday</li>
<li class="weekday">Tuesday</li>
<li class="weekday">Wednesday</li>
<li class="weekday">Thursday</li>
<li class="weekday">Friday</li>
<li class="weekday">Saturday</li>
<li class="weekday">Sunday</li>`;
}

function setMonthName(year, month) {
  const monthName = document.querySelector("#month h2");
  let studentName = localStorage.getItem("studentName");
  monthName.textContent = studentName + ": " + monthList[month] + ", " + year;
}

function setArrows(year, month) {
  var arrow1 = document.getElementById("arrow1");
  if (!arrow1) {
    createArrow("arrow1", "back");
  }
  if (isCurrMonth(year, month)) {
    if (arrow1) {
      deleteArrow("arrow2");
    }
  } else {
    var arrow2 = document.getElementById("arrow2");
    if (!arrow2) {
      createArrow("arrow2", "forward");
    }
  }
}

function isCurrMonth(year, month) {
  let currentTime = new Date();
  let currYear = currentTime.getFullYear();
  let currMonth = currentTime.getMonth();
  if (currYear == year && currMonth == month) {
    return true;
  } else {
    return false;
  }
}

function createArrow(arrowName, arrowDirection) {
  const monthLI = document.getElementById("month");
  const arrow = document.createElement("span");
  arrow.classList.add("arrow");
  arrow.id = arrowName;
  arrow.addEventListener("click", shiftMonth);
  arrow.direction = arrowDirection;
  monthLI.appendChild(arrow);
}

function deleteArrow(arrowName) {
  document.getElementById(`${arrowName}`).remove();
}

function shiftMonth(evt) {
  deleteCalendar();
  if (evt.currentTarget.direction == "back") {
    if (month != 0) {
      month -= 1;
    } else {
      month = 11;
      year -= 1;
    }
    fillCalendar(year, month, calendar, calendarID);
  } else if (evt.currentTarget.direction == "forward") {
    if (month != 11) {
      month += 1;
    } else {
      month = 0;
      year += 1;
    }
    fillCalendar(year, month, calendar, calendarID);
  }
}

function deleteCalendar() {
  const calendarList = document.querySelectorAll("#calendar > li");
  for (let i = 8; i < calendarList.length; i++) {
    calendarList[i].remove();
  }
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

function fillBlankDays(year, month, calendar) {
  for (let i = 0; i < getFirstDayOfMonth(year, month); i++) {
    const blankDate = document.createElement("li");
    calendar.appendChild(blankDate);
  }
}

function getDaysInAmonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

async function fillMonthDays(year, month, calendar) {
  const daysInMonth = getDaysInAmonth(year, month);
  for (let i = 1; i <= daysInMonth; i++) {
    populateDate(i, year, month, calendar);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    await populatePractice(i, year, month);
  }
}

function fillDates(year, month, daysInMonth, calendar) {
  for (let i = 1; i <= daysInMonth; i++) {
    populateDate(i, year, month, calendar);
  }
}

async function fillPractice(year, month, daysInMonth) {
  console.log("Filling practice. This may take a minute.");
  for (let i = 1; i <= daysInMonth; i++) {
    await populatePractice(i, year, month);
  }
  console.log("Practice filled successfully.");
  document.querySelector(".progress").classList.add("hidden");
}

function populateDate(i, year, month, calendar) {
  const li = document.createElement("li");
  const date = document.createElement("p");
  date.textContent = i;
  date.classList.add("monthDay");
  li.id = `${month + 1}/${i}/${year}`;

  li.appendChild(date);

  const currentTime = new Date();
  var day = currentTime.getDate();
  if (!isCurrMonth(year, month) || i <= day) {
    const label = document.createElement("label");
    const practiceNum = document.createElement("button");
    const input = document.createElement("input");
    practiceNum.classList.add("practiceNum");
    practiceNum.addEventListener("click", minutesToInput);
    practiceNum.day = i;
    practiceNum.month = month + 1;
    practiceNum.year = year;
    label.classList.add("practiceLabel");
    label.textContent = "minutes practiced:";
    input.type = "text";
    input.id = `in:${month + 1}/${i}/${year}`;
    input.classList.add("input");
    input.classList.add("hidden");
    input.maxLength = "3";
    label.setAttribute("for", input.id);
    label.value = li.appendChild(label);
    li.appendChild(input);
    li.appendChild(practiceNum);
  }
  calendar.appendChild(li);
}
async function populatePractice(i, year, month) {
  const currentTime = new Date();
  var day = currentTime.getDate();
  if (!isCurrMonth(year, month) || i <= day) {
    let practiceNum = document.querySelector(
      `#` + CSS.escape(`${month + 1}/${i}/${year}`) + ` button`
    );

    let dailyPractice = getPracticeByDate(
      practice,
      `${month + 1}/${i}/${year}`
    );

    if (dailyPractice) {
      practiceNum.innerHTML = dailyPractice;
    } else {
      practiceNum.innerHTML = 0;
    }
  }
}

function setCurrDay() {
  const currentTime = new Date();
  var year = currentTime.getFullYear();
  var month = currentTime.getMonth();
  var day = currentTime.getDate();
  var currDay = document.getElementById(`${month + 1}/${day}/${year}`);
  if (currDay) {
    currDay.classList.add("currDay");
  }
}

function fillRemainingCalendar(calendar) {
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
}

function minutesToInput(evt) {
  var day = evt.currentTarget.day;
  var month = evt.currentTarget.month;
  var year = evt.currentTarget.year;

  let practiceNum = document.querySelector(
    `#` + CSS.escape(`${month}/${day}/${year}`) + ` button`
  );

  let inputField = document.getElementById(`in:${month}/${day}/${year}`);
  practiceNum.classList.toggle("hidden");
  inputField.classList.toggle("hidden");
  inputField.select();
  if (inputField.getAttribute("listener") !== "true") {
    inputField.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        inputToMinutes();
      }
      const elementClicked = e.target;
      elementClicked.setAttribute("listener", "true");
    });
  }

  // let dailyPractice = getPracticeByDate(practice, `${month}/${day}/${year}`);
  let dailyPractice = practiceNum.textContent;
  if (dailyPractice) {
    inputField.value = dailyPractice;
  }

  document.day = day;
  document.month = month;
  document.year = year;
  document.addEventListener("mousedown", inputToMinutes);
}

function inputToMinutes() {
  var day = document.day;
  var month = document.month;
  var year = document.year;
  var date = `${month}/${day}/${year}`;

  let practiceNum = document.querySelector(
    `#` + CSS.escape(`${month}/${day}/${year}`) + ` button`
  );
  let inputField = document.getElementById(`in:${date}`);
  var minutes = inputField.value;
  if (minutes) {
    setPracticeByDate(studentID, date, minutes);
    practiceNum.textContent = minutes;
  }
  practiceNum.classList.toggle("hidden");
  inputField.classList.toggle("hidden");
  document.removeEventListener("mousedown", inputToMinutes);
}
