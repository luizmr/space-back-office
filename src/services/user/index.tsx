import http from 'services/commons/commonHttp';

const getAll = (data: any) => {
  return http.get('/User', { params: data });
};

const get = (id: string) => {
  return http.get(`/User/${id}`);
};

const post = (data: any) => {
  return http.post('/User', data);
};

const put = (id: string, data: any) => {
  return http.put(`/User/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/User/${id}`);
};

export default {
  getAll,
  get,
  post,
  put,
  remove
};
