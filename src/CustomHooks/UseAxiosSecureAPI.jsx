import axios from 'axios';
import React from 'react';

const axiosSecureAPIs = axios.create({
    baseURL: `http://localhost:3000`
});

const UseAxiosSecureAPI = () => {
    return axiosSecureAPIs;
};

export default UseAxiosSecureAPI;