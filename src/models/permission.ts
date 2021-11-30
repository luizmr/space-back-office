export interface PermissionDataOutput {
  id: string;
  updated_At?: string;
  created_At: string;
  permissionGroup: { id: string; name: string; app: { id: string; name: string } };
  name: string;
  slug: string;
  autorize: boolean;
}
