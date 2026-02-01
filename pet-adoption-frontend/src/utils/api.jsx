import axios from 'axios';

// Create Axios instance for API requests
const api = axios.create({
    baseURL: 'http://localhost:3000/api/', // Replace with your backend's URL if deployed
    
    withCredentials: true, // Include cookies in cross-origin requests
});

// Add interceptors for request and response if needed (optional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;
