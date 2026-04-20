import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api.bringodirect.com",
  // headers: {
  //   'Content-Type': 'application/json',

  // },
});

// Request interceptor to add the token to every request.. Adding an interception function //
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve token from localStorage
    console.log(accessToken);
    // If token exists, add it to the Authorization header..  still linked
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
