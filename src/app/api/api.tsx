import { ErrorModal } from '@/components/ErrorModal/ErrorModal';
import axios from 'axios';

export const baseUrlImg = 'https://library-backend.uz';
export const baseMediaUrl = 'https://library-backend.uz/uploads/';
export const baseUrl = 'https://library-backend.uz/api';
const token = 	typeof window !== 'undefined' ? localStorage.getItem('token') : null;
export const apiRoot = axios.create({
	baseURL: `https://library-backend.uz/api/`,
	
});

const instance = axios.create({
	baseURL: 'http://165.227.164.31:4040',
	
});

// Interceptors for handling common scenarios
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		console.log({ ...response, unauthorized: false }, 'test response');
		if (response?.status == 401) {
			return { ...response, unauthorized: true };
		} else {
			return { ...response, unauthorized: false };
		}
	},
	(error) => {
		if (error.response && error.response.status === 400) {
			return error.response;
		}
		if (error.response && error.response.status === 401) {
			// Handle 401 Unauthorized
		} else if (error.response && error.response.status === 404) {
			console.log('404 error handled');
			alert('Error - 404 Not found error');
		} else if (error.response && error.response.status === 500) {
			console.log('500 error handled');
			alert('Error - 500 Server or Backend');
		} else {
			console.log(error.response);
			alert(error.response.data);
		}
		return Promise.reject(error);
	}
);

export default instance;
