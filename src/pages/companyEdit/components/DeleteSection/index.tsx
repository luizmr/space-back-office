import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

// components
import ToastComponent from 'components/toast';
import DeleteComponent from 'components/deleteComponent';
import ModalDelete from 'components/modalDelete';

// services
import { CompanyService } from 'services';

type Props = {
  id: string;
};

const DeleteSection = ({ id }: Props) => {
  const history = useHistory();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastType, setToastType] = useState<string>('success');

  const handleDeleteCompany = () => {
    setLoading(true);
    CompanyService.remove(id)
      .then(() => {
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          history.push('/companies');
        }, 2000);
      })
      .catch(() => {
        setLoading(false);
        setToastType('error');
        setShowToast(true);
      });
  };

  const handleCloseShowToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <DeleteComponent
        subtitle={'company.delete-subtitle'}
        buttonText={'company.delete-company'}
        handleOpen={() => setModalShow(true)}
      />
      <ModalDelete
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleDelete={handleDeleteCompany}
        loading={loading}
        title={'company.delete-company'}
      />
      <ToastComponent
        open={showToast}
        string={toastType === 'error' ? 'error.company-delete-error' : 'company.delete-success'}
        type={toastType}
        handleClose={handleCloseShowToast}
        callClose={false}
      />
    </>
  );
};

export default DeleteSection;
