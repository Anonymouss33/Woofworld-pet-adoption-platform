import api from './api';

// Login the user
export const login = async (email, password) => {
    try {
        const response = await api.post('/customers/login', { email, password });
        return response.data; // Return the user data
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

// Register a new user
export const register = async (userData) => {
    try {
        const response = await api.post('/customers/register', userData);
        return response.data; // Return the registered user data
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch recommendations
export const fetchRecommendations = async () => {
    try {
        const response = await api.get('/recommendations');
        return response.data.recommendations; // Return the recommended pets
    } catch (error) {
        console.error('Fetch recommendations error:', error.response?.data || error.message);
        throw error;
    }
};

// Logout the user
export const logout = async () => {
    try {
        await api.post('/customers/logout');
    } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
        throw error;
    }
};
