import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const tasksApi = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTasks = () => tasksApi.get('/api/v1/tasks');
export const fetchTask = (id) => tasksApi.get(`/api/v1/tasks/${id}`);
export const createTask = (taskData) => tasksApi.post('/api/v1/tasks', taskData);
export const updateTask = (id, taskData) => tasksApi.patch(`/api/v1/tasks/${id}`, taskData);
export const deleteTask = (id) => tasksApi.delete(`/api/v1/tasks/${id}`);

export default tasksApi;