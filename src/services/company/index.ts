import http from 'services/commons/commonHttp';

const getApp = (id: any) => {
  return http.get(`/Company/apps/${id}`);
};

const getUsers = (id: any) => {
  return http.get(`/Company/users/${id}`);
};

export default {
  getApp,
  getUsers
};
