import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import DeleteSection from './components/DeleteSection';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';

// services
import { AppService } from 'services';

// models
import mock from './mock.json';
import { AppOutput } from 'models/app';
import Informations from 'pages/appEdit/components/Informations';

interface AuditCompareRouteParams {
  id: string;
}

function AppEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [app, setApp] = useState<AppOutput>(mock.state);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'app.saved-successfully'
  });

  const appId = match.params.id;

  useEffect(() => {
    setApp(mock.dataExample);
    // AppService.get(appId)
    //   .then(({ data }) => {
    //     setApp(data);
    setLoading(true);
    //   })
    //   .catch(() => {
    //     setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
    //   });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    AppService.put(app.id, { ...app })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: 'app.saved-successfully'
        });
        setTimeout(() => {
          setSubmitting(false);
          history.push('/apps');
        }, 1000);
      })
      .catch(err => {
        setSubmitting(false);
        setToast({ ...toast, show: true, type: 'error', message: 'error.app-edit-error' });
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
            <HeaderEdit title={'app.edit-app-title'} />
            <Informations app={app} />
            <DeleteSection id={appId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit redirect={'/apps'} loadingButton={submitting} handleEdit={handleEdit} />
        </>
      )}
    </>
  );
}

export default AppEdit;
