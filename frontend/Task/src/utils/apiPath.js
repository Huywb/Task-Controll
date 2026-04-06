export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    GET_PROFILE: "/api/v1/auth/profile",
  },
  USERS: {
    GET_ALL_USERS: "/api/v1/users",
    GET_USER_BY_ID: (userId) => `/api/v1/users/${userId}`,
    CREATE_USER: "/api/v1/users",
    UPDATE_USER: (userId) => `/api/v1/users/${userId}`,
    DELETE_USER: (userId) => `/api/v1/users/${userId}`,
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/v1/tasks/dashboard-data",
    GET_USER_DASHBOARD_DATA: "/api/v1/tasks/user-dashboard-data",
    GET_ALL_TASKS: "/api/v1/tasks",
    GET_TASK_BY_ID: (taskId) => `/api/v1/task/${taskId}`,
    CREATE_TASK: "/api/v1/tasks",
    UPDATE_TASK: (taskId) => `/api/v1/task/${taskId}`,
    DELETE_TASK: (taskId) => `/api/v1/task/${taskId}`,

    UPDATE_TASK_STATUS: (taskId) => `/api/v1/task/${taskId}/status`,
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/v1/task/${taskId}/todo`,
  },

  REPORTS: {
    EXPORT_TASKS: "/api/v1/reports/export/tasks",
    EXPORT_USERS: "/api/v1/reports/export/users",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
