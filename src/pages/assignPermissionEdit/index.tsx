import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import MemberGroup from 'pages/assignPermissionEdit/components/MemberGroup';
import MemberPermissions from 'pages/assignPermissionEdit/components/MemberPermissions';

import Informations from './components/Informations';
import Footer from './components/Footer';

// models
import { PermissionsOutput } from 'models/assignPermission';

function AssignPermissionEdit() {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [application, setApplication] = useState<any>({ id: '1', name: 'Vitrine' });
  const [member, setMember] = useState<string>('Space');
  const [group, setGroup] = useState<string>('11');
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Array<PermissionsOutput>>([]);

  useEffect(() => {
    setMember('Valbl');
  }, []);

  const handleConfirm = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      history.push('/assign-permission');
    }, 1500);
  };

  return (
    <div className='assignPermissionEdit__container'>
      <div className='assignPermissionEdit__header'>
        <Typography fontWeight='semibold' size='large'>
          {t('assignpermission.edit-permission-title')}
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
        <Typography fontWeight='bold' size='small'>
          {t('common.delete')}
        </Typography>
        <Typography fontWeight='regular' size='normal'>
          {t('assignpermission.delete-subtitle')}
        </Typography>
        <Button startIcon={<DeleteIcon />} variant='outlined'>
          <Typography fontWeight='semibold' size='small'>
            {t('common.delete-permission')}
          </Typography>
        </Button>
      </div>
      <div className='assignPermissionEdit__footer'>
        <Footer handleConfirm={handleConfirm} loadingButton={loadingButton} />
      </div>
    </div>
  );
}

export default AssignPermissionEdit;
