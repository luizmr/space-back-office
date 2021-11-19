import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router';
import Typography from '@eduzz/houston-ui/Typography';
import MemberGroup from 'pages/assignPermissionEdit/components/MemberGroup';
import MemberPermissions from 'pages/assignPermissionEdit/components/MemberPermissions';
import DeleteSection from './components/DeleteSection';
import Informations from './components/Informations';
import Footer from './components/Footer';

// models
import { PermissionsOutput } from 'models/assignPermission';
import ToastComponent from 'components/toast';

import memberOfMock from './mock.json';
// services
// import { MemberOfService } from 'services';

interface AuditCompareRouteParams {
  id: string;
}

function AssignPermissionEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [application, setApplication] = useState<any>({ id: '1', name: 'Vitrine' });
  const [member, setMember] = useState<string>('Space');
  const [group, setGroup] = useState<string>('11');
  const [permissions, setPermissions] = useState<Array<PermissionsOutput>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [toast, setToast] = useState<any>({
    show: false,
    type: 'success',
    message: t('assignpermission.saved-successfully')
  });

  const memberOfId = match.params.id;

  useEffect(() => {
    // MemberOfService.get(memberOfId)
    //   .then(({ data }) => {
    //     setMember(data.user.name);
    //     setApplication(data.app.name);
    //     setGroup(data.permissionGroup.id);
    //     setPermissions(data.permissions);
    //   })
    //   .catch(() => {});

    setMember(memberOfMock.user.name);
    setApplication(memberOfMock.app);
    setGroup(memberOfMock.permissionGroup.id);
    setPermissions(memberOfMock.permissions);
    setTimeout(() => {
      setLoading(true);
    }, 100);
  }, []);

  const handleConfirm = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      setToast({ ...toast, show: true });
      history.push('/assign-permission');
    }, 1500);
  };

  const handleClose = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <>
      {loading && (
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
          <DeleteSection id={memberOfId} />
          <div className='assignPermissionEdit__footer'>
            <Footer handleConfirm={handleConfirm} loadingButton={loadingButton} />
          </div>
          <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
        </div>
      )}
    </>
  );
}

export default AssignPermissionEdit;
