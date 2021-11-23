import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router';
import Typography from '@eduzz/houston-ui/Typography';

import ToastComponent from 'components/toast';
import MemberGroup from 'pages/assignPermissionNew/components/FormSection/components/MemberGroup';
import MemberPermissions from 'pages/assignPermissionNew/components/FormSection/components/MemberPermissions';
import DeleteSection from './components/DeleteSection';
import Informations from './components/Informations';
import Footer from './components/Footer';

// services
import { MemberOfService } from 'services';

// models
import { PermissionsOutput, UsersEditDataOutput } from 'models/assignPermission';

import memberOfMock from './mock.json';

interface AuditCompareRouteParams {
  id: string;
}

function AssignPermissionEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [application, setApplication] = useState<any>({ id: '1', name: 'Vitrine' });
  const [member, setMember] = useState<string>('Space');
  const [group, setGroup] = useState<string>('');
  const [memberAllData, setMemberAllData] = useState<UsersEditDataOutput>(memberOfMock);
  const [permissions, setPermissions] = useState<
    { permissionGroupId: string; permissions: Array<PermissionsOutput> }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<any>({
    show: false,
    type: 'success',
    message: t('assignpermission.saved-successfully')
  });

  const memberOfId = match.params.id;

  useEffect(() => {
    MemberOfService.get(memberOfId)
      .then(({ data }) => {
        setMemberAllData(data);
        setMember(data.user.name);
        setApplication(data.app.name);
        setGroup(data.permissionGroup.id);
        setLoading(true);
      })
      .catch(() => {
        setToast({ ...toast, show: true, type: 'error', message: t('error.load-data-error') });
      });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    const permissionsFalseArray: { permissionId: string; authorize: boolean }[] = [];

    permissions.forEach(obj => {
      if (obj.permissionGroupId === group) {
        obj.permissions.forEach(el => {
          !el.authorize && permissionsFalseArray.push({ permissionId: el.id, authorize: false });
        });
      }
    });
    MemberOfService.put({
      userCompanyId: memberAllData.user.userCompanyId,
      memberId: memberAllData.id,
      permissionGroupId: group,
      permissions: permissionsFalseArray
    })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: t('assignpermission.saved-successfully')
        });
        setTimeout(() => {
          setSubmitting(false);
          history.push('/assign-permission');
        }, 1000);
      })
      .catch(err => {
        setSubmitting(false);
        setToast({ ...toast, show: true, type: 'error', message: t('error.assign-permission-edit-error') });
      });
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
            <MemberGroup group={group} setGroup={setGroup} appId={memberAllData.app.id} edit />
            <hr />
            <MemberPermissions permissions={permissions} group={group} setPermissions={setPermissions} />
            <hr />
          </div>
          <DeleteSection id={memberOfId} />
          <div className='assignPermissionEdit__footer'>
            <Footer loadingButton={submitting} handleEdit={handleEdit} />
          </div>
          <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
        </div>
      )}
    </>
  );
}

export default AssignPermissionEdit;
