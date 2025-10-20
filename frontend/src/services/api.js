import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor - add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Don't redirect to login if we're already on the login endpoint
        const isLoginRequest = error.config?.url?.includes('/auth/login')
        
        // If 401 Unauthorized and NOT a login request, redirect to login
        if (error.response?.status === 401 && !isLoginRequest) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)

export default api