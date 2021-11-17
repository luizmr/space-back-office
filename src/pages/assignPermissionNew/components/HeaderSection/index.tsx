import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';
import Cancel from '@eduzz/houston-icons/Cancel';
import { ConcluidoPlugin } from 'assets';

type Props = {
  currentStep: number;
  // steps: Array<{ label: string; class: string; text: string }>;
};

function HeaderSection({ currentStep }: Props) {
  const { t } = useTranslation('common');
  const history = useHistory();

  const steps = [
    {
      label: '',
      class: 'assign-permission',
      text: t('assignpermission.form-step-1')
    },
    {
      label: '',
      class: 'assign-permission',
      text: t('assignpermission.form-step-2')
    },
    {
      label: '',
      class: 'assign-permission',
      text: t('assignpermission.form-step-3')
    }
  ];

  return (
    <div>
      {currentStep <= steps.length - 1 ? (
        <div className={steps[currentStep].class}>
          <div className='assign-permission__btns'>
            <Button
              onClick={() => {
                history.push('/assign-permission');
              }}
              endIcon={<Cancel />}
              variant='text'
            >
              <Typography fontWeight='semibold' size='small'>
                {t('common.cancel')}
              </Typography>
            </Button>
          </div>
          <div className='assign-permission__content'>
            <Typography fontWeight='regular' size='small'>
              {t('common.step')} {currentStep + 1} {t('common.from-lower')} {steps.length}
            </Typography>
            <Typography fontWeight='semibold' size='large'>
              {steps[currentStep].text}
            </Typography>
          </div>
          <div
            className='assign-permission__progressline'
            style={{ width: `calc((100vw/${steps.length + 1})*${currentStep + 1})` }}
          ></div>
        </div>
      ) : (
        <div className='assign-permission__done'>
          <div className='assign-permission__content'>
            <div className='assign-permission__content-finished'>
              <Typography fontWeight='semibold' size='x-large'>
                {t('common.done')}
              </Typography>
              <img src={ConcluidoPlugin} alt='Concluído' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderSection;
