import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { match } from 'react-router';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';
import MemberGroup from 'pages/assignPermissionEdit/components/MemberGroup';
import MemberPermissions from 'pages/assignPermissionEdit/components/MemberPermissions';
import SaveSolid from '@eduzz/houston-icons/SaveSolid';

import { PermissionsOutput } from 'models/assignPermission';
import Informations from './components/Informations';

function AssignPermissionEdit() {
  const { t } = useTranslation('common');
  const [application, setApplication] = useState<any>({ id: '1', name: 'Vitrine' });
  const [member, setMember] = useState<string>('Space');
  const [group, setGroup] = useState<string>('11');
  const [permissions, setPermissions] = useState<Array<PermissionsOutput>>([]);

  useEffect(() => {
    setMember('Valbl');
  }, []);

  return (
    <div className='assignPermissionEdit__container'>
      <div className='assignPermissionEdit__header'>
        <Typography fontWeight='semibold' size='large'>
          Edição de permissão
        </Typography>
      </div>
      <div className='assignPermissionEdit__infos'>
        <Informations application={application} member={member} />
        <hr />
      </div>
      <div className='assignPermissionEdit__permissions-group'>
        <>
          <MemberGroup group={group} setGroup={setGroup} appId={application.id} />
          <hr />
          <MemberPermissions permissions={permissions} group={group} setPermissions={setPermissions} />
          <hr />
        </>
      </div>
      <div className='assignPermissionEdit__delete'>
        <Button variant='outlined'>Deletar permissão</Button>
        <hr />
      </div>
      <div className='assignPermissionEdit__footer'>
        <Button variant='text'>Cancelar</Button>
        <Button startIcon={<SaveSolid />} variant='contained'>
          Salvar
        </Button>
      </div>
    </div>
  );
}

export default AssignPermissionEdit;
