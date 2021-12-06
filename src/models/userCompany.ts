export interface UserCompanyDataOutput {
  id: string;
  company: { id: string; name: string };
  user: { id: string; name: string; email: string };
  updated_At?: string;
  created_At: string;
}

export interface UserCompanyOutput {
  id: string;
  company: { id: string; name: string };
  user: { id: string; name: string; email: string };
}
