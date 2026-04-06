import axios from "axios";
import { BASE_URL } from "./apiPath";

export const axiosIntance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json'
    },
    withCredentials:true
})


