import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const baseURL = "https://musicclass.onrender.com";

// axios
//   .get(baseURL + `/students`)
//   .then((response) => console.log(response.data))
//   .catch((error) => console.log(error));

function getPracticeByDate(practice, date) {
  return practice[date];
}

function setPracticeByDate(id, date, minutes) {
  // console.log(`id:${id}\ndate:${date}\nminutes:${minutes}\nbaseURL:${baseURL}`);
  return axios
    .put(`${baseURL}/practice/${id}`, {
      practice: minutes,
      date: date,
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getPractice(studentID) {
  return axios
    .get(baseURL + `/students`)
    .then((response) => getStudent(response, studentID).practice)
    .catch((error) => console.log(error));
}

function getStudent(response, id) {
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i]._id == id) {
      return response.data[i];
    }
  }
  console.log("Student ID not found");
}

// getPractice("64db1ca98e25c74daadc6f94", "6/21/2023");

export { getPracticeByDate, getPractice, setPracticeByDate };
