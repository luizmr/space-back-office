import http from 'services/commons/commonHttp';

const getAll = (data: any) => {
  return http.get('/App', { params: data });
};

const get = (id: string) => {
  return http.get(`/App/${id}`);
};

const post = (data: any) => {
  return http.post('/App', data);
};

const put = (id: string, data: any) => {
  return http.put(`/App/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/App/${id}`);
};

const checkSlug = (slug: any) => {
  return http.get(`/App/slug/${slug}`);
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
  checkSlug,
  getPermissionsGroup
};
