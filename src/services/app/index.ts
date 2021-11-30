import http from 'services/commons/commonHttp';

const getAll = () => {
  return http.get('/App');
};

const get = (id: string) => {
  return http.get(`/App/${id}`);
};

const post = (data: any) => {
  return http.post('/App', data);
};

const put = (id: string, data: any) => {
  return http.put('/App', data);
};

const remove = (id: string) => {
  return http.delete(`/App/${id}`);
};

const getPermissionsGroup = (id: any, option: any) => {
  return http.get(`/App/permissiongroups/${id}`, { params: option });
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
  getPermissionsGroup
};
