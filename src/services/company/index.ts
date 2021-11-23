import http from 'services/commons/commonHttp';

const getApp = (id: any) => {
  return http.get(`/Company/${id}/Apps`);
};

const getUsers = (id: any) => {
  return http.get(`/Company/${id}/Users`);
};

export default {
  getApp,
  getUsers
};
