import axios from 'axios';

import { config } from 'environment';

const httpAuth = axios.create({
	baseURL: config.url.AUTH_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

export const SetAuthToken = (token: string | null) => {
	httpAuth.defaults.headers.Authorization = token;
};

export default httpAuth;
