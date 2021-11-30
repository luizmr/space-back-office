import http from 'services/commons/commonHttp';

const getAll = () => {
  return http.get('/MemberOf');
};

const get = (id: any) => {
  return http.get(`/MemberOf/${id}`);
};

const post = (data: any) => {
  return http.post('/MemberOf', data);
};

const put = (id: string, data: any) => {
  return http.put(`/MemberOf/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/MemberOf/${id}`);
};

export default {
  getAll,
  get,
  post,
  put,
  remove
};
