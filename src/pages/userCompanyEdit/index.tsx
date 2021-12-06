import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import DeleteSection from './components/DeleteSection';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';

// services
import { UserCompanyService } from 'services';

// models
import mock from './mock.json';
import { UserCompanyOutput } from 'models/userCompany';
import EditMainComponent from 'pages/userCompanyEdit/components/EditMainComponent';

interface AuditCompareRouteParams {
  id: string;
}

function UserCompanyEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [user, setUser] = useState<UserCompanyOutput>(mock.state);
  const [slugValid, setSlugValid] = useState<number>(2);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'user.saved-successfully'
  });

  const userId = match.params.id;

  useEffect(() => {
    // setUser(mock.dataExample);
    UserCompanyService.get(userId)
      .then(({ data }) => {
        setUser(data[0]);
        setLoading(true);
      })
      .catch(() => {
        setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
      });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    UserCompanyService.put(user.id, { id: user.id, companyId: user.company.id, email: user.user.email })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: 'user.saved-successfully'
        });
        setTimeout(() => {
          setSubmitting(false);
          history.push('/users');
        }, 1000);
      })
      .catch(err => {
        setSubmitting(false);
        setToast({ ...toast, show: true, type: 'error', message: 'error.user-edit-error' });
      });
  };

  const handleClose = () => {
    setToast({ ...toast, show: false });
  };

  const disableCondition = user.company.id === '0';

  return (
    <>
      {loading && (
        <>
          <div className='general-edit__container'>
            <HeaderEdit title={'user.edit-user-title'} />
            <EditMainComponent user={user} setUser={setUser} />
            <DeleteSection id={userId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit
            redirect={'/users'}
            loadingButton={submitting}
            handleEdit={handleEdit}
            disableCondition={disableCondition}
          />
        </>
      )}
    </>
  );
}

export default UserCompanyEdit;
