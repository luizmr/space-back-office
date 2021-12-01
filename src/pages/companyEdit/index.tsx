import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { match } from 'react-router';

import ToastComponent from 'components/toast';
import DeleteSection from './components/DeleteSection';
import FooterEdit from 'components/footerEdit';
import HeaderEdit from 'components/headerEdit';
import EditMainComponent from './components/EditMainComponent';

// services
import { CompanyService } from 'services';

// models
import mock from './mock.json';
import { CompanyOutput } from 'models/company';
import ValidateEmail from 'utils/validateEmail';

interface AuditCompareRouteParams {
  id: string;
}

function CompanyEdit({ match }: { match: match<AuditCompareRouteParams> }) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanyOutput>(mock.state);
  const [toast, setToast] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: 'success',
    message: 'company.saved-successfully'
  });

  const companyId = match.params.id;

  useEffect(() => {
    setCompany(mock.dataExample);
    // CompanyService.get(companyId)
    //   .then(({ data }) => {
    //     setCompany(data);
    setLoading(true);
    //   })
    //   .catch(() => {
    //     setToast({ ...toast, show: true, type: 'error', message: 'error.load-data-error' });
    //   });
  }, []);

  const handleEdit = () => {
    setSubmitting(true);
    CompanyService.put({ ...company })
      .then(response => {
        setToast({
          show: true,
          type: 'success',
          message: 'company.saved-successfully'
        });
        setTimeout(() => {
          setSubmitting(false);
          history.push('/companies');
        }, 1000);
      })
      .catch(err => {
        setSubmitting(false);
        setToast({ ...toast, show: true, type: 'error', message: 'error.company-edit-error' });
      });
  };

  const handleClose = () => {
    setToast({ ...toast, show: false });
  };

  const disableCondition =
    !company.name.length || !company.contact.length || company.phone.length < 10 || !ValidateEmail(company.email);

  return (
    <>
      {loading && (
        <>
          <div className='general-edit__container'>
            <HeaderEdit title={'company.edit-company-title'} />
            <EditMainComponent company={company} setCompany={setCompany} />
            <DeleteSection id={companyId} />
            <ToastComponent open={toast.show} type={toast.type} string={toast.message} handleClose={handleClose} />
          </div>
          <FooterEdit
            redirect={'/companies'}
            loadingButton={submitting}
            handleEdit={handleEdit}
            disableCondition={disableCondition}
          />
        </>
      )}
    </>
  );
}

export default CompanyEdit;
