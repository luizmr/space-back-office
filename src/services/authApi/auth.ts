import http from 'services/commons/authHttp';

const login = (data: any) => {
	return http.get(`/Auth/${data}`);
};

export default { login };
