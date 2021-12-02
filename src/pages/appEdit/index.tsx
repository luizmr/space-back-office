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
import EditMainComponent from 'pages/appEdit/components/EditMainComponent';

interface AuditCompareRouteParams {
  id: string;
}

function AppEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [app, setApp] = useState<AppOutput>(mock.state);
  const [slugValid, setSlugValid] = useState<number>(2);
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
    AppService.put(app.id, { ...app, companyId: app.company.id })
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

  const disableCondition = !app.slug.length || !app.name.length || slugValid !== 2;

  return (
    <>
      {loading && (
        <>
          <div className='general-edit__container'>
            <HeaderEdit title={'app.edit-app-title'} />
            <EditMainComponent app={app} setApp={setApp} slugValid={slugValid} setSlugValid={setSlugValid} />
            <DeleteSection id={appId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit
            redirect={'/apps'}
            loadingButton={submitting}
            handleEdit={handleEdit}
            disableCondition={disableCondition}
          />
        </>
      )}
    </>
  );
}

export default AppEdit;
