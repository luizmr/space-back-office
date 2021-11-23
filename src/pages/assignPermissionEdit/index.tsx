import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router';
import Typography from '@eduzz/houston-ui/Typography';

import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';

import ToastComponent from 'components/toast';
import MemberGroup from 'pages/assignPermissionNew/components/FormSection/components/MemberGroup';
import MemberPermissions from 'pages/assignPermissionNew/components/FormSection/components/MemberPermissions';
import DeleteSection from './components/DeleteSection';
import Informations from './components/Informations';
import Footer from './components/Footer';

// services
// import {
// MemberOfService
// PermissionGroupService
// } from 'services';

// models
import { PermissionsOutput, UsersEditDataOutput } from 'models/assignPermission';

import memberOfMock from './mock.json';
import mock from 'pages/assignPermissionNew/mock.json';
// import mockPanel from 'pages/assignPermissionPanel/mock.json';

interface AuditCompareRouteParams {
  id: string;
}

function AssignPermissionEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [application, setApplication] = useState<any>({ id: '1', name: 'Vitrine' });
  const [member, setMember] = useState<string>('Space');
  const [group, setGroup] = useState<string>('11');
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
    // MemberOfService.get(memberOfId)
    //   .then(({ data }) => {
    //     setMemberAllData(data);
    //     setMember(data.user.name);
    //     setApplication(data.app.name);
    //     setGroup(data.permissionGroup.id);

    // PermissionGroupService.getPermission(data.permissionGroup.id)
    //   .then(({ data }) => {
    //     const newPermissionsArray: Array<PermissionsOutput> = [];
    //     data.permissions.forEach((permission: PermissionsOutput) => {
    //       const foundPermission: PermissionsOutput | undefined = memberOfMock.permissions.find(
    //         (userPermission: PermissionsOutput) => permission.slug === userPermission.slug
    //       );
    //       if (foundPermission) {
    //         newPermissionsArray.push(foundPermission);
    //       } else {
    //         newPermissionsArray.push(permission);
    //       }
    //     });
    //     setPermissions([
    //       {
    //         permissionGroupId: memberOfMock.permissionGroup.id,
    //         permissions: newPermissionsArray
    //       }
    //     ]);
    //   })
    //   .catch(() => {});
    //   })
    //   .catch(() => {});
    setMemberAllData(memberOfMock);
    setMember(memberOfMock.user.name);
    setApplication(memberOfMock.app);
    setGroup(memberOfMock.permissionGroup.id);

    const permissionsFound = mock.permissions.find(obj => obj.groupId === memberOfMock.permissionGroup.id)!;
    const newPermissionsArray: Array<PermissionsOutput> = [];
    permissionsFound.permissions.forEach((permission: any) => {
      const foundPermission: any = memberOfMock.permissions.find(
        (userPermission: any) => permission.slug === userPermission.slug
      );
      if (foundPermission) {
        newPermissionsArray.push(foundPermission);
      } else {
        newPermissionsArray.push(permission);
      }
    });
    setPermissions([
      {
        permissionGroupId: memberOfMock.permissionGroup.id,
        permissions: newPermissionsArray
      }
    ]);

    setTimeout(() => {
      setLoading(true);
    }, 100);
  }, []);

  const form = useForm({
    initialValues: {
      app: memberAllData.app.id,
      userCompanyId: memberAllData.user.userCompanyId,
      memberId: memberAllData.id
    },
    validationSchema: yup => {
      return yup.object().shape({
        app: yup.string(),
        userCompanyId: yup.string(),
        memberId: yup.string()
      });
    },
    onSubmit: async values => {
      setSubmitting(true);
      const { userCompanyId, memberId } = values;

      const permissionsFalseArray: { permissionId: string; authorize: boolean }[] = [];

      permissions.forEach(obj => {
        if (obj.permissionGroupId === group) {
          obj.permissions.forEach(el => {
            !el.authorize && permissionsFalseArray.push({ permissionId: el.id, authorize: false });
          });
        }
      });

      // try {
      //   await MemberOfService.put({
      //     userCompanyId,
      //     memberId,
      //     permissionGroupId: group,
      //     permissions: permissionsFalseArray
      //   });
      setToast({ ...toast, show: true });
      setTimeout(() => {
        setSubmitting(false);
        // setToast({ ...toast, show: true });
        history.push('/assign-permission');
      }, 1000);
      // } catch {
      //   setSubmitting(false);
      //   setToast({ ...toast, show: true, type: 'error', message: 'Erro ao editar permissão' });
      // }

      console.log({
        userCompanyId,
        memberId,
        permissionGroupId: group,
        permissions: permissionsFalseArray
      });
    }
  });

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
          <Form context={form}>
            <div className='assignPermissionEdit__permissions-group'>
              <MemberGroup group={group} setGroup={setGroup} appId={application.id} edit />
              <hr />
              <MemberPermissions permissions={permissions} group={group} setPermissions={setPermissions} />
              <hr />
            </div>
            <DeleteSection id={memberOfId} />
            <div className='assignPermissionEdit__footer'>
              <Footer loadingButton={submitting} />
            </div>
          </Form>
          <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
        </div>
      )}
    </>
  );
}

export default AssignPermissionEdit;
