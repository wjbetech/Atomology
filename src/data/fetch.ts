import axios from "axios";
const baseURL = "https://kineticzephyr.onrender.com/periodictable";

export const GET = async () => {
  return axios.get(`${baseURL}`);
};
