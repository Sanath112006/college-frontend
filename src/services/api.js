import axios from 'axios';
import { API_BASE_URL, normalizeComplaintStatus } from '../constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Student complaint APIs
export const complaintAPI = {
  submit: (data) => {
    const formData = new FormData();
    const { file, ...complaintFields } = data || {};
    formData.append('complaint', new Blob([JSON.stringify(complaintFields)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return api.post('/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getMyComplaints: () => api.get('/complaints/my'),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
};

// Admin APIs (backend: /api/complaints with admin role)
export const adminAPI = {
  getAllComplaints: (params) => api.get('/complaints', { params }),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  updateStatus: (id, status) =>
    api.patch(`/complaints/${id}/status`, { status: normalizeComplaintStatus(status) }),
  respondToComplaint: (id, response) => api.post(`/complaints/${id}/responses`, { message: response }),
};

export default api;
