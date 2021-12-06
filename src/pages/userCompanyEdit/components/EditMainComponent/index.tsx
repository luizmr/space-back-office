import React from 'react';
import Informations from '../Informations';
import EditForm from '../EditForm';
import { UserCompanyOutput } from 'models/userCompany';

type Props = {
  user: UserCompanyOutput;
  setUser: React.Dispatch<React.SetStateAction<UserCompanyOutput>>;
};

const EditMainComponent = ({ user, setUser }: Props) => {
  return (
    <>
      <Informations user={user} />
      <EditForm user={user} setUser={setUser} />
    </>
  );
};

export default EditMainComponent;
