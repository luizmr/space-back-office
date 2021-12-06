import http from 'services/commons/commonHttp';

const getAll = (data: any) => {
  return http.get('/UserCompany', { params: data });
};

const get = (id: string) => {
  return http.get(`/UserCompany/${id}`);
};

const post = (data: any) => {
  return http.post('/UserCompany', data);
};

const put = (id: string, data: any) => {
  return http.put(`/UserCompany/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/UserCompany/${id}`);
};

export default {
  getAll,
  get,
  post,
  put,
  remove
};
