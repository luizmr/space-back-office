import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import SaveSolid from '@eduzz/houston-icons/SaveSolid';

interface Props {
  loadingButton: boolean;
  handleEdit: () => void;
  redirect: string;
  disableCondition?: boolean;
}

function FooterEdit({ loadingButton, handleEdit, redirect, disableCondition = false }: Props) {
  const { t } = useTranslation('common');
  const history = useHistory();

  return (
    <div className='general-edit__footer'>
      <div className='general-edit__footer-main'>
        <Button
          variant='text'
          onClick={() => {
            history.push(redirect);
          }}
        >
          {t('common.cancel')}
        </Button>
        <Button
          loading={loadingButton}
          disabled={disableCondition}
          startIcon={<SaveSolid />}
          variant='contained'
          onClick={() => handleEdit()}
        >
          {t('common.save')}
        </Button>
      </div>
    </div>
  );
}

export default FooterEdit;
