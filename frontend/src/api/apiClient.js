import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || 'https://referral-task-i1j4.onrender.com';
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
