import http from 'services/commons/commonHttp';

const getAll = (data: any) => {
  return http.get('/Permission', { params: data });
};

const get = (id: string) => {
  return http.get(`/Permission/${id}`);
};

const post = (data: any) => {
  return http.post('/Permission', data);
};

const put = (data: any) => {
  return http.put('/Permission', data);
};

const remove = (id: string) => {
  return http.delete(`/Permission/${id}`);
};

const checkSlug = (slug: any) => {
  return http.get(`/Permission/slug/${slug}`);
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
  checkSlug
};
