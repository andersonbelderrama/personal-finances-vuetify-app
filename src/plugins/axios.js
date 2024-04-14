import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default axiosInstance
