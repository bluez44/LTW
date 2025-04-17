import axios from "axios";

const API_URL = "http://localhost:85/LTW_ASS/backend/app/public"; // Replace with your actual API URL

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
    maxBodyLength: Infinity,
    withCredentials: true
});

export const login = async ({username, password}) => {
    // console.log(username, password);

    try {
        const response = await instance.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        // console.error("Login error:", error);
        return error.response.data;
    }
}

export const register = async ({ email, user_name, password, first_name, last_name, phone_number, birth_day }) => {
    try {
        const response = await instance.post(
            `${API_URL}/register`, 
            { 
                email, 
                user_name,
                password,
                first_name,
                last_name,
                phone_number,
                birth_day 
            });
        return response.data;
    } catch (error) {
        // console.error("Registration error:", error);
        return error.response.data;
    }
}

export const getUserInfo = async (userId) => {
    try {
        const response = await instance.get(`${API_URL}/profile`);
        return response.data;
    } catch (error) {
        // console.error("Get user info error:", error);
        return error.response.data;
    }
}