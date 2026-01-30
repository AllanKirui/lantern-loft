import axios from "axios"
import { snakeToCamel } from "./case-transformers"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

// Use Axios response interceptors to apply the case transformer
apiClient.interceptors.response.use((response) => {
  response.data = snakeToCamel(response.data)
  return response
})

export default apiClient
