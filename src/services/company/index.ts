import http from 'services/commons/commonHttp';

const getApp = (id: any) => {
  return http.get(`/Company/apps/${id}`);
};

export default {
  getApp
};
