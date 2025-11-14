import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

export const NextServer = axios.create({
    baseURL: baseURL,
    withCredentials: true,

})