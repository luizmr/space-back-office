import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';
import { LogoEduzz } from 'assets';

const PolicyInfo = () => {
  const { t } = useTranslation('common');
  return (
    <div className='policy-info'>
      <div className='policy-info__content'>
        <div className='content__left'>
          <div className='left__logo'>
            <img src={LogoEduzz} alt='Logo da Eduzz' />
            <span>Loja de Apps</span>
          </div>
          <div className='left__column'></div>
          <div className='left__info'>
            <Typography fontWeight='regular' size='small'>
              Loja de Apps {new Date().getFullYear()}.
            </Typography>
            <Typography fontWeight='regular' size='small'>
              {t('homepage.todos-direitos')}
            </Typography>
          </div>
        </div>
        <div className='content__right'>
          <Button
            variant='text'
            onClick={() => {
              return window.open('https://www.eduzz.com/politica-de-privacidade', '_blank');
            }}
          >
            <Typography fontWeight='regular' size='small'>
              {t('homepage.politica')}
            </Typography>
          </Button>
          <div className='right__column'></div>
          <Button
            variant='text'
            onClick={() => {
              return window.open('https://www.eduzz.com/termos-e-condicoes', '_blank');
            }}
          >
            <Typography fontWeight='regular' size='small'>
              {t('homepage.termos')}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyInfo;
