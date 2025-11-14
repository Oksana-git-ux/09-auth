import axios from "axios";

export const NextServer = axios.create({
  baseURL: '/api',
  withCredentials: true,
});