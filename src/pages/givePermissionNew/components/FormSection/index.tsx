import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material-ui/icons
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';
import SelectField from '@eduzz/houston-ui/Forms/Select';
import ToastComponent from 'components/toast';

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const FormSection = ({ currentStep, setCurrentStep }: Props) => {
  const { t } = useTranslation('common');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    initialValues: { app: '0', user: '0', group: '' },
    validationSchema: yup => {
      return yup.object().shape({
        app: yup.string(),
        user: yup.string(),
        group: yup.string()
      });
    },
    onSubmit: async values => {
      // setSubmitting(true);
      const { app, user, group } = values;
      console.log('enviar');
      // try {
      //   await AppStoreService.preRegister({ partner, app: obj });
      //   setTimeout(() => {
      setSubmitting(false);
      setCurrentStep(3);
      //   }, 1000);
      // } catch {
      //   setSubmitting(false);
      //   setOpen(true);
      // }
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='give-permission__new-form'>
        <div className='give-permission__new-form__body'>
          <div className='give-permission__new-form__form'>
            <Form context={form}>
              {currentStep === 0 && (
                <SelectField
                  id='app-select'
                  name='app'
                  label={t('common.app')}
                  options={[
                    { label: '20', value: 20 },
                    { label: '40', value: 40 },
                    { label: '80', value: 80 }
                  ]}
                />
              )}

              {currentStep === 1 && (
                <SelectField
                  id='user-select'
                  name='user'
                  label={t('common.member')}
                  options={[
                    { label: '20', value: 20 },
                    { label: '40', value: 40 },
                    { label: '80', value: 80 }
                  ]}
                />
              )}

              {currentStep === 2 && (
                <SelectField
                  id='example-select'
                  name='user'
                  options={[
                    { label: '20', value: 20 },
                    { label: '40', value: 40 },
                    { label: '80', value: 80 }
                  ]}
                />
              )}

              <div className='give-permission__new-form__submit'>
                <Button
                  variant='text'
                  onClick={() => {
                    setNextButton(true);
                    setCurrentStep(currentStep - 1);
                  }}
                >
                  {t('common.previous')}
                </Button>
                {currentStep === 2 ? (
                  <Button
                    loading={submitting}
                    disabled={nextButton || !form.isValid || form.isSubmitting}
                    type='submit'
                  >
                    {t('givepermission.finish-assignment')}
                  </Button>
                ) : (
                  <Button
                    disabled={!form.getFieldValue('app') || !form.getFieldValue('user')}
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                      setTimeout(() => {
                        setNextButton(false);
                      }, 10);
                    }}
                  >
                    {t('common.next')}
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
      <ToastComponent open={open} handleClose={handleClose} string={t('givepermission.permission-error')} />
    </>
  );
};

export default FormSection;
