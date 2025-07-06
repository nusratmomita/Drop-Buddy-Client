import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';


const axiosSecureAPIs = axios.create({
    baseURL: `http://localhost:3000`
});

const UseAxiosSecureAPI = () => {
    const {user} = useContext(AuthContext);
    // using interceptors in a common place and also to secure APIs
    axiosSecureAPIs.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    } , (error)=>{
        return Promise.reject(error);
    });
    return axiosSecureAPIs;
};

export default UseAxiosSecureAPI;