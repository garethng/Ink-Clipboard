import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.warn('baseURL', baseURL);
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const api = axios.create({
    baseURL,
});

export default api;
