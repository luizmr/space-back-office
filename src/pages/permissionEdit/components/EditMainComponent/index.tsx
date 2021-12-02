import React from 'react';
import Informations from '../Informations';
import EditForm from '../EditForm';
import { PermissionOutput } from 'models/permission';

type Props = {
  permission: PermissionOutput;
  setPermission: React.Dispatch<React.SetStateAction<PermissionOutput>>;
  slugValid: number;
  setSlugValid: React.Dispatch<React.SetStateAction<number>>;
};

const EditMainComponent = ({ permission, setPermission, slugValid, setSlugValid }: Props) => {
  return (
    <>
      <Informations permission={permission} />
      <EditForm
        permission={permission}
        setPermission={setPermission}
        slugValid={slugValid}
        setSlugValid={setSlugValid}
      />
    </>
  );
};

export default EditMainComponent;
