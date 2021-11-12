import React from 'react';
import Typography from '@eduzz/houston-ui/Typography';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t, i18n } = useTranslation('common');
  return (
    <div className='homepage'>
      <Typography size='large' fontWeight='semibold'>
        {t('homepage.homepage-title')}
      </Typography>
      <Typography size='medium' fontWeight='semibold'>
        {t('homepage.homepage-subtitle')}
      </Typography>
    </div>
  );
};

export default HomePage;
