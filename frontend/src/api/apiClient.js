import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || 'https://referral-task.onrender.com';
const apiClient = axios.create({
    baseURL: rawBaseURL.endsWith('/api') ? rawBaseURL : `${rawBaseURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
