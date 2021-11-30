import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';
import Add from '@eduzz/houston-icons/Add';

type Props = {
  title: string;
  subtitle: string;
  buttonTitle: string;
  buttonPath: string;
};

const PanelHeader = ({ title, subtitle, buttonPath, buttonTitle }: Props) => {
  const { t } = useTranslation('common');
  const history = useHistory();
  return (
    <>
      <div className='panel-header'>
        <Typography fontWeight='semibold' size='large'>
          {t(title)}
        </Typography>
        <Button
          startIcon={<Add />}
          onClick={() => {
            history.push(buttonPath);
          }}
          variant='outlined'
        >
          <Typography fontWeight='semibold'>{t(buttonTitle)}</Typography>
        </Button>
      </div>
      <div className='panel-header__sub-title'>
        <Typography fontWeight='regular' size='normal'>
          {t(subtitle)}
        </Typography>
      </div>
    </>
  );
};

export default PanelHeader;
