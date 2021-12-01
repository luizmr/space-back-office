import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@eduzz/houston-ui/Typography';

type Props = {
  title: string;
};

const HeaderEdit = ({ title }: Props) => {
  const { t } = useTranslation('common');
  return (
    <div className='general-edit__header'>
      <Typography fontWeight='semibold' size='large'>
        {t(title)}
      </Typography>
    </div>
  );
};

export default HeaderEdit;
