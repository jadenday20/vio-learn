import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const baseURL = "https://musicclass.onrender.com/";

axios
  .get(baseURL + `students`)
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));
