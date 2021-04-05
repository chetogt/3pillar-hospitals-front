import axios from 'axios';

const g_instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {'Content-Type': 'application/json'}
});

export default g_instance;