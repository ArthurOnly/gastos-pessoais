import axios from 'axios';

const API = axios.create({
    baseURL : 'https://7c2bad50.us-south.apigw.appdomain.cloud/api'
});

export default API;