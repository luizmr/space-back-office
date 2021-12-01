import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

// components
import ToastComponent from 'components/toast';
import DeleteComponent from 'components/deleteComponent';
import ModalDelete from 'components/modalDelete';

// services
import { PermissionGroupService } from 'services';

type Props = {
  id: string;
};

const DeleteSection = ({ id }: Props) => {
  const history = useHistory();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastType, setToastType] = useState<string>('success');

  const handleDeleteApp = () => {
    setLoading(true);
    PermissionGroupService.remove(id)
      .then(() => {
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          history.push('/permission-groups');
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
        subtitle={'permission-group.delete-subtitle'}
        buttonText={'permission-group.delete-permission-group'}
        handleOpen={() => setModalShow(true)}
      />
      <ModalDelete
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleDelete={handleDeleteApp}
        loading={loading}
        title={'permission-group.delete-permission-group'}
      />
      <ToastComponent
        open={showToast}
        string={toastType === 'error' ? 'error.permission-group-delete-error' : 'permission-group.delete-success'}
        type={toastType}
        handleClose={handleCloseShowToast}
        callClose={false}
      />
    </>
  );
};

export default DeleteSection;
