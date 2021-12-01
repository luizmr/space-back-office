import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@eduzz/houston-ui/Button';
import ModalPanel from 'components/modalPanel';

type Props = {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleDelete: () => void;
  title: string;
};

function ModalDelete({ modalShow, setModalShow, handleDelete, loading, title }: Props) {
  const { t } = useTranslation('common');
  return (
    <>
      <ModalPanel
        loading={false}
        modalShow={modalShow}
        backgroundColor={'#F44336'}
        headerText={t(title)}
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
                onClick={() => handleDelete()}
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

export default ModalDelete;
