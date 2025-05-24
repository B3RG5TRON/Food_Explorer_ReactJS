import axios from "axios"

export const api = axios.create({
  // Uncomment the baseURL you want to use
  baseURL: "https://foodexplorernodejsapi-production.up.railway.app",
  // baseURL: "http://localhost:3333",
  withCredentials: true,
})