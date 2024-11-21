import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.124.162:3000',
    withCredentials: true
})