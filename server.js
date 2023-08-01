import axios from "axios";
const baseURL = "https://musicclass.onrender.com/";

axios
  .get(baseURL + `songs`)
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));
