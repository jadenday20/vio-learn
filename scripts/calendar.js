import { getPractice, getPracticeByDate } from "../server.js";

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

const calendar = document.getElementById("calendar");

var practice = await getPractice("64db1ca98e25c74daadc6f94");

async function fillCalendar(year, month, calendar) {
  setMonthName(year, month);
  setArrows(year, month);
  fillBlankDays(year, month, calendar);
  await fillMonthDays(year, month, calendar);
  fillRemainingCalendar(calendar);
  setCurrDay();
}

function setMonthName(year, month) {
  const monthName = document.querySelector("#month h2");
  monthName.textContent = monthList[month] + ", " + year;
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
    fillCalendar(year, month, calendar);
  } else if (evt.currentTarget.direction == "forward") {
    if (month != 11) {
      month += 1;
    } else {
      month = 0;
      year += 1;
    }
    fillCalendar(year, month, calendar);
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
    label.classList.add("practiceLabel");
    label.textContent = "minutes practiced:";
    input.type = "text";
    input.id = `in:${month + 1}/${i}/${year}`;
    input.classList.add("input");
    input.maxLength = "3";
    label.setAttribute("for", input.id);
    label.value = li.appendChild(label);
    // li.appendChild(input);
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

fillCalendar(year, month, calendar);
