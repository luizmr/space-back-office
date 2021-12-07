import http from 'services/commons/commonHttp';

const getAll = (data: any) => {
  return http.get('/PermissionGroup', { params: data });
};

const get = (id: string) => {
  return http.get(`/PermissionGroup/${id}`);
};

const post = (data: any) => {
  return http.post('/PermissionGroup', data);
};

const put = (id: string, data: any) => {
  return http.put(`/PermissionGroup/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/PermissionGroup/${id}`);
};

const checkSlug = (slug: any) => {
  return http.get(`/PermissionGroup/slug/${slug}`);
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
  checkSlug
};
