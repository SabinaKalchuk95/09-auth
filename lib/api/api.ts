import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

// Для серверних запитів через Next.js (SSR)
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});
