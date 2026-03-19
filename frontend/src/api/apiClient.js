import axios from 'axios';

const appEnv = import.meta.env.VITE_APP_ENV || 'production';
const prodURL = import.meta.env.VITE_PROD_API_URL || 'https://referral-task-i1j4.onrender.com';
const localURL = import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:8080';

const rawBaseURL = appEnv === 'production' ? prodURL : (import.meta.env.VITE_API_URL || localURL);

const apiClient = axios.create({
    baseURL: rawBaseURL.endsWith('/api') ? rawBaseURL : `${rawBaseURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});



apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // Don't send token for login/register
    const isPublicPath = config.url.includes('/auth/login') || config.url.includes('/auth/register');

    if (token && !isPublicPath) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;