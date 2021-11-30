export interface PermissionGroupDataOutput {
  id: string;
  updated_At?: string;
  created_At: string;
  app: { id: string; name: string; company: { id: string; name: string } };
  name: string;
  slug: string;
  defaultGroup: boolean;
  active: boolean;
}
