import http from 'services/commons/commonHttp';

const getPermissionsGroup = (id: any, option: any) => {
  return http.get(`/App/permissiongroups/${id}`, { params: { active: option } });
};

const getUsers = (id: any) => {
  return http.get(`/Company/users/${id}`);
};

export default {
  getPermissionsGroup,
  getUsers
};
