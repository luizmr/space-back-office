export interface AppDataOutput {
  id: string;
  updated_At?: string;
  created_At: string;
  company: { id: string; name: string };
  name: string;
  slug: string;
  defaultAccess: boolean;
}

export interface AppOutput {
  id: string;
  company: { id: string; name: string };
  name: string;
  slug: string;
  defaultAccess: boolean;
}
