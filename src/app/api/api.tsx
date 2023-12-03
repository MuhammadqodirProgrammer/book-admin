import { ErrorModal } from '@/components/ErrorModal/ErrorModal';
import axios from 'axios';

export const baseUrlImg = 'http://165.227.164.31:4040';
export const baseUrl = 'http://165.227.164.31:4040/api';

const apiRoot = axios.create({
	baseURL: `http://161.35.188.153`,
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
