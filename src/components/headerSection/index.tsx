import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';
import Cancel from '@eduzz/houston-icons/Cancel';
import { ConcluidoPlugin } from 'assets';

type Props = {
  currentStep: number;
  steps: Array<{ text: string }>;
  buttonPath: string;
};

function HeaderSection({ currentStep, steps, buttonPath }: Props) {
  const { t } = useTranslation('common');
  const history = useHistory();

  return (
    <div>
      {currentStep <= steps.length - 1 ? (
        <div className='general-new'>
          <div className='general-new__btns'>
            <Button
              onClick={() => {
                history.push(buttonPath);
              }}
              endIcon={<Cancel />}
              variant='text'
            >
              <Typography fontWeight='semibold' size='small'>
                {t('common.cancel')}
              </Typography>
            </Button>
          </div>
          <div className='general-new__content'>
            <Typography fontWeight='regular' size='small'>
              {t('common.step')} {currentStep + 1} {t('common.from-lower')} {steps.length}
            </Typography>
            <Typography fontWeight='semibold' size='large'>
              {t(steps[currentStep].text)}
            </Typography>
          </div>
          <div
            className='general-new__progressline'
            style={{ width: `calc((100vw/${steps.length + 1})*${currentStep + 1})` }}
          ></div>
        </div>
      ) : (
        <div className='general-new__done'>
          <div className='general-new__content'>
            <div className='general-new__content-finished'>
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
