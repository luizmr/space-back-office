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

const put = (data: any) => {
  return http.put('/MemberOf', data);
};

const deleteMemberOf = (data: any) => {
  return http.delete('/MemberOf', data);
};

export default {
  getAll,
  get,
  post,
  put,
  deleteMemberOf
};
