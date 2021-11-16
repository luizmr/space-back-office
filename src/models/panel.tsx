export interface UsersDataOutput {
  id: number;
  updated_at?: string;
  created_at: string;
  application: string;
  name: string;
  permissionGroup: string;
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
