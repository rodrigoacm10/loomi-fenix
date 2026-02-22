import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const expiredToken = Cookies.get('token')

        if (expiredToken) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            { access_token: expiredToken },
            { headers: { 'Content-Type': 'application/json' } },
          )

          const newToken = response.data.access_token

          if (newToken) {
            Cookies.set('token', newToken)
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return api(originalRequest)
          }
        }
      } catch (refreshError) {
        Cookies.remove('token')
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
