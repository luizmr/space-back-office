import http from 'services/commons/authHttp';

const getAll = (data: any) => {
  return http.get('/users', { params: data });
};

const get = (email: any) => {
  return http.get(`/users/${email}`);
};

const create = (data: any) => {
  return http.post('/users', data);
};

const update = (email: any, data: any) => {
  return http.put(`/users/${email}`, data);
};

const remove = (email: any) => {
  return http.delete(`/users/${email}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove
};
