import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import MemberGroup from 'pages/assignPermissionNew/components/FormSection/components/MemberGroup';
import MemberPermissions from 'pages/assignPermissionNew/components/FormSection/components/MemberPermissions';
import DeleteSection from './components/DeleteSection';
import Informations from './components/Informations';

// services
import { MemberOfService } from 'services';

// models
import { AppsOutput, PermissionsStateOutput, UsersEditDataOutput } from 'models/assignPermission';

import memberOfMock from './mock.json';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';

interface AuditCompareRouteParams {
  id: string;
}

function AssignPermissionEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [application, setApplication] = useState<AppsOutput>({ id: '1', name: 'Vitrine', slug: 'vitrine' });
  const [member, setMember] = useState<string>('Space');
  const [group, setGroup] = useState<string>('');
  const [memberAllData, setMemberAllData] = useState<UsersEditDataOutput>(memberOfMock);
  const [permissions, setPermissions] = useState<PermissionsStateOutput[]>([
    {
      permissionGroupId: '',
      permissions: [{ id: '', slug: '', authorize: true, name: '' }]
    }
  ]);
  const [permissionsEdit, setPermissionsEdit] = useState<PermissionsStateOutput>({
    permissionGroupId: '',
    permissions: [{ id: '', slug: '', authorize: true, name: '' }]
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'assignpermission.saved-successfully'
  });

  const memberOfId = match.params.id;

  useEffect(() => {
    MemberOfService.get(memberOfId)
      .then(({ data }) => {
        setMemberAllData(data);
        setMember(data.user.name);
        setApplication(data.app.name);
        setGroup(data.permissionGroup.id);
        setPermissionsEdit({ permissionGroupId: data.permissionGroup.id, permissions: data.permissions });
        setLoading(true);
      })
      .catch(() => {
        setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
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

    MemberOfService.put(memberAllData.id, {
      userCompanyId: memberAllData.user.id,
      oldPermissionGroupId: memberAllData.permissionGroup.id,
      permissionGroupId: group,
      permissions: permissionsFalseArray,
      appId: memberAllData.app.id
    })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: 'assignpermission.saved-successfully'
        });
        setTimeout(() => {
          setSubmitting(false);
          history.push('/assign-permissions');
        }, 1000);
      })
      .catch(err => {
        setSubmitting(false);
        setToast({ ...toast, show: true, type: 'error', message: 'error.assign-permission-edit-error' });
      });
  };

  const handleClose = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <>
      {loading && (
        <>
          <div className='general-edit__container'>
            <HeaderEdit title={'assignpermission.edit-permission-title'} />
            <Informations application={application} member={member} />
            <div className='general-edit__permissions-group'>
              <MemberGroup group={group} setGroup={setGroup} appId={memberAllData.app.id} edit />
              <hr />
              <MemberPermissions
                permissions={permissions}
                permissionsEdit={permissionsEdit}
                group={group}
                setPermissions={setPermissions}
              />
              <hr />
            </div>
            <DeleteSection id={memberOfId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit redirect={'/assign-permissions'} loadingButton={submitting} handleEdit={handleEdit} />
        </>
      )}
    </>
  );
}

export default AssignPermissionEdit;
