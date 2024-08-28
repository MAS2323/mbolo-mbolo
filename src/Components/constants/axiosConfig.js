import axios from "axios";
import { API_BASE_URL } from "../services/config";
const token = "Q$r2K6W8n!jCW%ZK";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
// import React, { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState(null);

//   return (
//     <UserContext.Provider
//       value={{ isLoggedIn, setIsLoggedIn, userType, setUserType }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
