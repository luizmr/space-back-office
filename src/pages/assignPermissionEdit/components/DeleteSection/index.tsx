import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import ModalComponent from '../Modal';
import ToastComponent from 'components/toast';

import { MemberOfService } from 'services';

type Props = {
  id: string;
};

const DeleteSection = ({ id }: Props) => {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastType, setToastType] = useState<string>('success');

  const handleDeleteMemberOf = () => {
    setLoading(true);
    MemberOfService.remove(id)
      .then(() => {
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          history.push('/assign-permissions');
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
      <div className='assignPermissionEdit__delete'>
        <Typography fontWeight='bold' size='small'>
          {t('common.delete')}
        </Typography>
        <Typography fontWeight='regular' size='normal'>
          {t('assignpermission.delete-subtitle')}
        </Typography>
        <Button startIcon={<DeleteIcon />} variant='outlined' onClick={() => setModalShow(true)}>
          <Typography fontWeight='semibold' size='small'>
            {t('assignpermission.delete-permission')}
          </Typography>
        </Button>
      </div>
      <ModalComponent
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleDeleteApp={handleDeleteMemberOf}
        loading={loading}
      />
      <ToastComponent
        open={showToast}
        string={toastType === 'error' ? 'error.assign-permission-delete-error' : 'assignpermission.delete-success'}
        type={toastType}
        handleClose={handleCloseShowToast}
        callClose={false}
      />
    </>
  );
};

export default DeleteSection;
