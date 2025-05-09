import axios from 'axios';

export const API_URL = 'http://localhost/LTW_ASS/backend/app/public';

// Instance cho các API yêu cầu xác thực
export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  maxBodyLength: Infinity,
  withCredentials: true,
});

// Instance cho các API công khai (không yêu cầu token)
export const publicInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  maxBodyLength: Infinity,
  withCredentials: false,
});

// Interceptor chỉ áp dụng cho instance (API yêu cầu xác thực)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token in request:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header:', config.headers.Authorization);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Auth APIs (yêu cầu xác thực)
export const login = async ({ username, password }) => {
  try {
    const response = await instance.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const adminLogin = async ({ username, password }) => {
  try {
    const response = await instance.post('/admin/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const register = async (formData) => {
  try {
    const response = await instance.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const logout = async () => {
  try {
    const response = await instance.post('/logout');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await instance.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Get user info error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const getAdminInfo = async () => {
  try {
    const response = await instance.get('/admin/profile');
    return response.data;
  } catch (error) {
    console.error('Get admin info error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

// Contact APIs
export const sendContactForm = async ({ full_name, email, phoneNo, content }) => {
  try {
    const response = await publicInstance.post('/contact', { full_name, email, phoneNo, content });
    return response.data;
  } catch (error) {
    console.error('Send contact form error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const getAllContactForms = async () => {
  try {
    const response = await instance.get('/admin/contact');
    return response.data;
  } catch (error) {
    console.error('Get all contact forms error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const updateContactFormStatus = async (id, status) => {
  try {
    const response = await instance.post(`/admin/contact/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Update contact form status error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const deleteContactForm = async (id) => {
  try {
    const response = await instance.delete(`/admin/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete contact form error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await instance.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const changePassword = async ({ current_pass, new_pass }) => {
  try {
    const response = await instance.post('/profile/reset', { current_pass, new_pass });
    return response.data;
  } catch (error) {
    console.error('Change password error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

// Product APIs (công khai)
export const getProducts = async () => {
  try {
    console.log('Sending getProducts request');
    const response = await publicInstance.get('/products');
    console.log('getProducts response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get products error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const getProductById = async (id) => {
  try {
    console.log('Sending getProductById request:', { id });
    const response = await publicInstance.get(`/products/${id}`);
    console.log('getProductById response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get product by ID error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const addProduct = async (productData) => {
  try {
    console.log('Sending addProduct request:', productData);
    const response = await publicInstance.post('/products', productData);
    console.log('addProduct response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Add product error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    console.log('Sending updateProduct request:', { id, productData });
    const response = await publicInstance.post(`/products/${id}`, productData);
    console.log('updateProduct response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update product error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const deleteProduct = async (id) => {
  try {
    console.log('Sending deleteProduct request:', { id });
    const response = await publicInstance.delete(`/products/${id}`);
    console.log('deleteProduct response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete product error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

// Order APIs (công khai)
export const createOrder = async (orderData) => {
  try {
    console.log('Sending createOrder request:', orderData);
    const response = await publicInstance.post('/orders', orderData);
    console.log('createOrder response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create order error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};

export const getOrders = async () => {
  try {
    console.log('Sending getOrders request');
    const response = await publicInstance.get('/orders');
    console.log('getOrders response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get orders error:', error);
    const responseData = error.response?.data || { message: 'Lỗi không xác định' };
    responseData.status = error.response?.status;
    return responseData;
  }
};