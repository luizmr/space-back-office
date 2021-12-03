import React from 'react';
import Informations from '../Informations';
import EditForm from '../EditForm';
import { UserOutput } from 'models/user';

type Props = {
  user: UserOutput;
  setUser: React.Dispatch<React.SetStateAction<UserOutput>>;
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
