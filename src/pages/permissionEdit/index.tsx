import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import DeleteSection from './components/DeleteSection';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';
import EditMainComponent from 'pages/permissionEdit/components/EditMainComponent';

// services
import { PermissionService } from 'services';

// models
import mock from './mock.json';
import { PermissionOutput } from 'models/permission';

interface AuditCompareRouteParams {
  id: string;
}

function PermissionEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [permission, setPermission] = useState<PermissionOutput>(mock.state);
  const [slugValid, setSlugValid] = useState<number>(2);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'permission.saved-successfully'
  });

  const permissionId = match.params.id;

  useEffect(() => {
    setPermission(mock.dataExample);
    PermissionService.get(permissionId)
      .then(({ data }) => {
        setPermission(data[0]);
        setLoading(true);
      })
      .catch(() => {
        setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
      });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    PermissionService.put(permission.id, { ...permission, permisisonGroupId: permission.permissionGroup.id })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: 'permission.saved-successfully'
        });
        setTimeout(() => {
          setSubmitting(false);
          history.push('/permission-groups');
        }, 1000);
      })
      .catch(err => {
        setSubmitting(false);
        setToast({ ...toast, show: true, type: 'error', message: 'error.permission-group-edit-error' });
      });
  };

  const handleClose = () => {
    setToast({ ...toast, show: false });
  };

  const disableCondition = !permission.slug.length || !permission.name.length || slugValid !== 2;

  return (
    <>
      {loading && (
        <>
          <div className='general-edit__container'>
            <HeaderEdit title={'permission.edit-permission-title'} />
            <EditMainComponent
              permission={permission}
              setPermission={setPermission}
              slugValid={slugValid}
              setSlugValid={setSlugValid}
            />
            <DeleteSection id={permissionId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit
            redirect={'/permissions'}
            loadingButton={submitting}
            handleEdit={handleEdit}
            disableCondition={disableCondition}
          />
        </>
      )}
    </>
  );
}

export default PermissionEdit;
