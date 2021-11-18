import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@eduzz/houston-ui/Button';
import ModalPanel from 'components/modalPanel';

function ModalComponent({ modalShow, setModalShow, handleDeleteApp, loading }: any) {
  const { t } = useTranslation('common');
  return (
    <>
      <ModalPanel
        loading={false}
        modalShow={modalShow}
        backgroundColor={'#F44336'}
        headerText={t('common.delete-permission')}
        bodyContent={
          <>
            <div className='modal-panel__title'>{t('common.confirm-operation')}</div>
            <div className='modal-panel__buttons' style={{ marginTop: '24px' }}>
              <Button
                variant='text'
                onClick={() => setModalShow(false)}
                className={loading ? 'button-disabled-text' : 'button-cancel'}
                disabled={loading}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant='outlined'
                onClick={() => handleDeleteApp()}
                className={loading ? 'button-disabled-contained' : 'button-error'}
                loading={loading}
              >
                {t('common.confirm')}
              </Button>
            </div>
          </>
        }
      />
    </>
  );
}

export default ModalComponent;
