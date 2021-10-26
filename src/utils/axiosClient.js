import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4500",
  headers: {
    "Content-Type": "application/json",
  },
  handlerEnabled: false,
});

export default instance;
