import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    // authURL: 'http://localhost:8080/auth',
    headers: {
        'Content-Type': 'application/json',
    }
})

const axiosAuthInstance = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    }
})

export {axiosInstance, axiosAuthInstance}