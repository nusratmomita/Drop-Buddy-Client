import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router";

const axiosSecureAPIs = axios.create({
  baseURL: `http://localhost:3000`,
});

const UseAxiosSecureAPI = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  // using interceptors in a common place and also to secure APIs
  axiosSecureAPIs.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecureAPIs.interceptors.response.use(
    (response) => {
      return response; // for normal cases
    },
    (error) => {
      console.log("Inside response interceptor", error);
      const errorStatus = error.status;

      if (errorStatus === 403) {
        navigate("/forbiddenRoute");
      } 
      else if (errorStatus === 401) {
        handleLogout()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }
    }
  );
  return axiosSecureAPIs;
};

export default UseAxiosSecureAPI;
