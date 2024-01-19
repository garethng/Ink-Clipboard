import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json', // 添加您需要的头部信息
        'Accept': 'application/json'
    }

});

export default api;
