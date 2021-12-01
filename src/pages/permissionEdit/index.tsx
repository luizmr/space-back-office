import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import DeleteSection from './components/DeleteSection';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';

// services
import { PermissionService } from 'services';

// models
import mock from './mock.json';
import { PermissionOutput } from 'models/permission';
import Informations from 'pages/permissionEdit/components/Informations';

interface AuditCompareRouteParams {
  id: string;
}

function PermissionEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [permission, setPermission] = useState<PermissionOutput>(mock.state);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'permission.saved-successfully'
  });

  const permissionId = match.params.id;

  useEffect(() => {
    setPermission(mock.dataExample);
    // PermissionService.get(permissionId)
    //   .then(({ data }) => {
    //     setPermission(data);
    setLoading(true);
    //   })
    //   .catch(() => {
    //     setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
    //   });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    PermissionService.put({ ...permission })
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
        setToast({ ...toast, show: true, type: 'error', message: 'error.permissionp-group-edit-error' });
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
            <HeaderEdit title={'permission.edit-permission-title'} />
            <Informations permission={permission} />
            <DeleteSection id={permissionId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit redirect={'/permissions'} loadingButton={submitting} handleEdit={handleEdit} />
        </>
      )}
    </>
  );
}

export default PermissionEdit;
