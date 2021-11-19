export interface UsersDataOutput {
  id: number;
  updated_At?: string;
  created_At: string;
  user: {
    name: string;
    userCompanyId: string;
  };
  app: AppsOutput;
  permissionGroup: { id: string; name: string; slug: string };
}

export interface UsersEditDataOutput {
  id: string;
  user: {
    userCompanyId: string;
    name: string;
  };
  app: AppsOutput;
  permissionGroup: { id: string; name: string; slug: string };
  permissions: Array<PermissionsOutput>;
}

export interface AppsOutput {
  id: string;
  name: string;
  slug: string;
}

export interface UsersOutput {
  id: string;
  name: string;
  email: string;
  accountId: number;
}

export interface GroupsOutput {
  id: string;
  appId: string;
  name: string;
  slug: string;
  defaultGroup: boolean;
  active: boolean;
}

export interface PermissionsOutput {
  id: string;
  authorize: boolean;
  name: string;
  slug: string;
}

export interface SelectFieldOutput {
  label: string;
  value: string;
}

export interface PermissionsStateOutput {
  permissionGroupId: string;
  permissions: Array<PermissionsOutput>;
}
