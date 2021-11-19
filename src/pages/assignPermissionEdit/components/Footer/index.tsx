import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import SaveSolid from '@eduzz/houston-icons/SaveSolid';

interface Props {
  loadingButton: boolean;
}

function Footer({ loadingButton }: Props) {
  const { t } = useTranslation('common');
  const history = useHistory();

  return (
    <>
      <Button
        variant='text'
        onClick={() => {
          history.push('/assign-permission');
        }}
      >
        {t('common.cancel')}
      </Button>
      <Button loading={loadingButton} startIcon={<SaveSolid />} variant='contained' type='submit'>
        {t('common.save')}
      </Button>
    </>
  );
}

export default Footer;
