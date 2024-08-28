import axios from "axios";
export const API_BASE_URL = "https://backend-mbolo.onrender.com";

export const api = axios.create({
  baseURL: "https://backend-mbolo.onrender.com", // Cambia esto por la URL de tu backend
});

// import axios from "axios";
// export const API_BASE_URL = "http://192.168.0.119:3000";

// export const api = axios.create({
//   baseURL: "http://192.168.0.119:3000", // Cambia esto por la URL de tu backend
// });
