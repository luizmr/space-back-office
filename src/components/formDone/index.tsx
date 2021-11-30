import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';

type Props = {
  title: string;
  buttonPath: string;
};

function FormDone({ title, buttonPath }: Props) {
  const { t } = useTranslation('common');
  const history = useHistory();
  return (
    <div className='general-new__form-done'>
      <div className='steps-section'>
        <div className='done-section'>
          <Typography size='normal' fontWeight='regular' className='partner-text-done'>
            {t(title)}
          </Typography>
          <div className='done-section__buttons'>
            <Button variant='outlined' onClick={() => history.push(buttonPath)}>
              {t('assignpermission.back-to-panel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDone;
