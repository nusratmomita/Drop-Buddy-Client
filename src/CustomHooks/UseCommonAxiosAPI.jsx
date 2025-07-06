import axios from 'axios';
import React from 'react';

const commonAxiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const UseCommonAxiosAPI = () => {
    return commonAxiosSecure;
};

export default UseCommonAxiosAPI;