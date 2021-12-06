import http from 'services/commons/commonHttp';

const getAll = () => {
  return http.get('/Company');
};

const get = (id: string) => {
  return http.get(`/Company/${id}`);
};

const post = (data: any) => {
  return http.post('/Company', data);
};

const put = (id: string, data: any) => {
  return http.put(`/Company/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/Company/${id}`);
};

const getApp = (id: any) => {
  return http.get(`/Company/${id}/Apps`);
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
  getApp
};
