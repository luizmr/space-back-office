import http from 'services/commons/commonHttp';

const getPermission = (id: any) => {
  return http.get(`/PermissionGroup/permissions/${id}`);
};

export default {
  getPermission
};
