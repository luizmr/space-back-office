import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import DeleteSection from './components/DeleteSection';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';
import EditMainComponent from 'pages/permissionGroupEdit/components/EditMainComponent';

// services
import { PermissionGroupService } from 'services';

// models
import mock from './mock.json';
import { PermissionGroupOutput } from 'models/permissionGroup';

interface AuditCompareRouteParams {
  id: string;
}

function PermissionGroupEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroupOutput>(mock.state);
  const [slugValid, setSlugValid] = useState<number>(2);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'permission-group.saved-successfully'
  });

  const permissionGroupId = match.params.id;

  useEffect(() => {
    setPermissionGroup(mock.dataExample);
    // PermissionGroupService.get(permissionGroupId)
    //   .then(({ data }) => {
    //     setPermissionGroup(data);
    setLoading(true);
    //   })
    //   .catch(() => {
    //     setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
    //   });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    PermissionGroupService.put(permissionGroup.id, { ...permissionGroup, appId: permissionGroup.app.id })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: 'permission-group.saved-successfully'
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

  const disableCondition = !permissionGroup.slug.length || !permissionGroup.name.length || slugValid !== 2;

  return (
    <>
      {loading && (
        <>
          <div className='general-edit__container'>
            <HeaderEdit title={'permission-group.edit-permission-group-title'} />
            <EditMainComponent
              permissionGroup={permissionGroup}
              setPermissionGroup={setPermissionGroup}
              slugValid={slugValid}
              setSlugValid={setSlugValid}
            />
            <DeleteSection id={permissionGroupId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit
            redirect={'/permission-groups'}
            loadingButton={submitting}
            handleEdit={handleEdit}
            disableCondition={disableCondition}
          />
        </>
      )}
    </>
  );
}

export default PermissionGroupEdit;
