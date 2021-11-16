import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';
import { LogoEduzz } from 'assets';

const PolicyInfo = () => {
  const location = useLocation();
  const { t } = useTranslation('common');
  const [showPolicyInfo, setShowPolicyInfo] = useState<boolean>(true);
  useEffect(() => {
    location.pathname === '/' ? setShowPolicyInfo(true) : setShowPolicyInfo(false);
  }, [location.pathname]);
  return (
    <>
      {showPolicyInfo ? (
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
                  {t('homepage.all-rights')}
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
                  {t('homepage.policy')}
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
                  {t('homepage.terms')}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default PolicyInfo;
