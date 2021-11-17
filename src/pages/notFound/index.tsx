import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Material UI / Icons
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';

// Images
import { NotFoundImage } from 'assets';

export default function NotFound() {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (localStorage.getItem('language')) {
      if (localStorage.getItem('language') === 'br') {
        i18n.changeLanguage('pt');
      } else {
        i18n.changeLanguage('en');
      }
    }
  }, []);

  return (
    <div className='notFound-page'>
      <img src={NotFoundImage} alt='not-found' />
      <div>
        <Typography fontWeight='bold' size='medium'>
          Ops!
        </Typography>
        <Typography className='content' fontWeight='regular' size='normal'>
          {`${t('not-found.text')}`}
        </Typography>
        <Link to='/'>
          <Button variant='outlined' startIcon={<KeyboardArrowLeftRoundedIcon />}>
            {`${t('common.go-back')}`}
          </Button>
        </Link>
      </div>
    </div>
  );
}
