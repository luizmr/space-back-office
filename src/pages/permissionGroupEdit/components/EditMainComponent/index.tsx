import React from 'react';
import Informations from '../Informations';
import EditForm from '../EditForm';
import { PermissionGroupOutput } from 'models/permissionGroup';

type Props = {
  permissionGroup: PermissionGroupOutput;
  setPermissionGroup: React.Dispatch<React.SetStateAction<PermissionGroupOutput>>;
  slugValid: number;
  setSlugValid: React.Dispatch<React.SetStateAction<number>>;
};

const EditMainComponent = ({ permissionGroup, setPermissionGroup, slugValid, setSlugValid }: Props) => {
  return (
    <>
      <Informations permissionGroup={permissionGroup} />
      <EditForm
        permissionGroup={permissionGroup}
        setPermissionGroup={setPermissionGroup}
        slugValid={slugValid}
        setSlugValid={setSlugValid}
      />
    </>
  );
};

export default EditMainComponent;
