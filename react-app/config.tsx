const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3033/api';

export const API = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    CHECK_AUTH: `${API_BASE_URL}/auth/check-auth`
  },
  USERS: {
    GET_USERINFO: `${API_BASE_URL}/users/userinfo`,
    GET_SCHEDULE: `${API_BASE_URL}/users/schedule`,
    GET_AVAILABLE_COURSES: `${API_BASE_URL}/users/available-courses`,
    BOOK_COURSE: `${API_BASE_URL}/users/bookCourse`,
    GET_STUDENTS: `${API_BASE_URL}/users/get-students`,
    ADD_STUDENT: `${API_BASE_URL}/users/add-students`,
    UPDATE_STUDENT: (id) => `${API_BASE_URL}/users/students/${id}`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  },
  PROGRESS: {
    GET_STUDENT: (studentId) => `${API_BASE_URL}/progress/${studentId}`,
  },
};