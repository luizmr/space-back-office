import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';
import Add from '@eduzz/houston-icons/Add';

const AssignPermissionHeader = () => {
  const { t } = useTranslation('common');
  const history = useHistory();
  return (
    <>
      <div className='panel-header'>
        <Typography fontWeight='semibold' size='large'>
          {t('assignpermission.title')}
        </Typography>
        <Button
          startIcon={<Add />}
          onClick={() => {
            history.push('/assign-permission/new');
          }}
          variant='outlined'
        >
          <Typography fontWeight='semibold'>{t('dashboard.assign-permission')}</Typography>
        </Button>
      </div>
      <div className='panel-header__sub-title'>
        <Typography fontWeight='regular' size='normal'>
          {t('assignpermission.subtitle')}
        </Typography>
      </div>
    </>
  );
};

export default AssignPermissionHeader;
