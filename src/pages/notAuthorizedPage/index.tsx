import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@eduzz/houston-ui/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotAuthorizedPage = () => {
  const { t, i18n } = useTranslation('common');
  return (
    <div className='homepage'>
      <Typography size='large' fontWeight='semibold'>
        {t('homepage.not-authorized')}
      </Typography>
      <div className='homepage__icon'>
        <SentimentVeryDissatisfiedIcon fontSize='large' />
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
