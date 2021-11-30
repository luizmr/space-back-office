import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';

function FormDone() {
  const { t } = useTranslation('common');
  const history = useHistory();
  return (
    <div className='assign-permission__form-done'>
      <div className='steps-section'>
        <div className='done-section'>
          <Typography size='normal' fontWeight='regular' className='partner-text-done'>
            {t('assignpermission.permission-done')}
          </Typography>
          <div className='done-section__buttons'>
            <Button variant='outlined' onClick={() => history.push('/assign-permissions')}>
              {t('assignpermission.back-to-panel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDone;
