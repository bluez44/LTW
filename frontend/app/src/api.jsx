import axios from 'axios';

export const API_URL = 'http://localhost:85/LTW_ASS/backend/app/public'; // Replace with your actual API URL

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  maxBodyLength: Infinity,
  withCredentials: true,
});

export const login = async ({ username, password }) => {
  // console.log(username, password);

  try {
    const response = await instance.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    // console.error("Login error:", error);
    return error;
  }
};

export const adminLogin = async ({ username, password }) => {
  // console.log(username, password);

  try {
    const response = await instance.post(`${API_URL}/admin/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return error;
  }
};

export const authUser = async () => {
  try {
    const response = await instance.get(`${API_URL}/auth`);
    return response.data;
  } catch (error) {
    // console.error("Auth user error:", error);
    return error;
  }
};

export const register = async (formData) => {
  try {
    const response = await instance.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Registration error:", error);
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await instance.post(`${API_URL}/logout`);
    // localStorage.removeItem('userInfo');
    return response.data;
  } catch (error) {
    // console.error("Logout error:", error);
    return error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await instance.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    // console.error("Get user info error:", error);
    return error;
  }
};

export const getAdminInfo = async () => {
  try {
    const response = await instance.get(`${API_URL}/admin/profile`);
    return response.data;
  } catch (error) {
    // console.error("Get user info error:", error);
    return error;
  }
};

export const sendContactForm = async ({ full_name, email, phoneNo, content }) => {
  try {
    const response = await instance.post(`${API_URL}/contact`, { full_name, email, phoneNo, content });
    return response.data;
  } catch (error) {
    // console.error("Send contact form error:", error);
    return error;
  }
};

export const getAllContactForms = async () => {
  try {
    const response = await instance.get(`${API_URL}/admin/contact`);
    return response.data;
  } catch (error) {
    // console.error("Get all contact forms error:", error);
    return error;
  }
};

export const updateContactFormStatus = async (id, status) => {
  // console.log(id, status);

  try {
    const response = await instance.post(`${API_URL}/admin/contact/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Update contact form status error:', error);
    return error;
  }
};

export const deleteContactForm = async (id) => {
  try {
    const response = await instance.delete(`${API_URL}/admin/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete contact form error:', error);
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await instance.get(`${API_URL}/admin/users`);
    return response.data;
  } catch (error) {
    // console.error("Get all users error:", error);
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await instance.delete(`${API_URL}/admin/users`, { data: { id } });
    return response.data;
  } catch (error) {
    // console.error("Delete user error:", error);
    return error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await instance.post(`${API_URL}/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Update profile error:", error);
    return error;
  }
};

export const changePassword = async ({ current_pass, new_pass }) => {
  try {
    const response = await instance.post(`${API_URL}/profile/reset`, { current_pass, new_pass });
    return response.data;
  } catch (error) {
    // console.error("Change password error:", error);
    return error;
  }
};

export const getAllMissions = async () => {
  try {
    const response = await instance.get(`${API_URL}/missions`);
    return response.data;
  } catch (error) {
    // console.error("Get all missions error:", error);
    return error;
  }
};

export const addMission = async (mission) => {
  try {
    const response = await instance.post(`${API_URL}/missions/add`, mission);
    return response.data;
  } catch (error) {
    // console.error("Add mission error:", error);
    return error;
  }
};

export const updateMission = async (mission) => {
  try {
    const response = await instance.post(`${API_URL}/missions`, mission);
    return response.data;
  } catch (error) {
    // console.error("Update mission error:", error);
    return error;
  }
};

export const deleteMission = async (id) => {
  try {
    const response = await instance.delete(`${API_URL}/missions/delete`, { data: { id } });
    return response.data;
  } catch (error) {
    // console.error("Delete mission error:", error);
    return error;
  }
};

export const getAllMenuItems = async () => {
  try {
    const response = await instance.get(`${API_URL}/menu-items`);
    return response.data;
  } catch (error) {
    // console.error("Get all menu items error:", error);
    return error;
  }
};

export const getAllSubMenuItems = async () => {
  try {
    const response = await instance.get(`${API_URL}/sub-menu-items`);
    return response.data;
  } catch (error) {
    // console.error("Get all sub menu items error:", error);
    return error;
  }
};
