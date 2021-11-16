import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material-ui/icons
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';
import SelectField from '@eduzz/houston-ui/Forms/Select';

// components
import ToastComponent from 'components/toast';

// models
import { SelectFieldOutput } from 'models/panel';

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  apps: Array<SelectFieldOutput>;
  members: Array<SelectFieldOutput>;
};

const FormSection = ({ currentStep, setCurrentStep, apps, members }: Props) => {
  const { t } = useTranslation('common');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    initialValues: { app: '0', member: '0', group: '' },
    validationSchema: yup => {
      return yup.object().shape({
        app: yup.string(),
        member: yup.string(),
        group: yup.string()
      });
    },
    onSubmit: async values => {
      // setSubmitting(true);
      const { app, member, group } = values;
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
                  options={[{ value: '0', label: t('givepermission.select-app') }, ...apps]}
                />
              )}

              {currentStep === 1 && (
                <SelectField
                  id='member-select'
                  name='member'
                  label={t('common.member')}
                  options={[{ value: '0', label: t('givepermission.select-member') }, ...members]}
                />
              )}

              {currentStep === 2 && (
                <SelectField
                  id='example-select'
                  name='member'
                  options={[
                    { label: '20', value: 20 },
                    { label: '40', value: 40 },
                    { label: '80', value: 80 }
                  ]}
                />
              )}

              <div className='give-permission__new-form__submit'>
                {(currentStep === 1 || currentStep === 2) && (
                  <Button
                    variant='text'
                    onClick={() => {
                      setNextButton(true);
                      setCurrentStep(currentStep - 1);
                    }}
                  >
                    {t('common.previous')}
                  </Button>
                )}
                {currentStep === 3 ? (
                  <Button
                    loading={submitting}
                    disabled={nextButton || !form.isValid || form.isSubmitting}
                    type='submit'
                  >
                    {t('givepermission.finish-assignment')}
                  </Button>
                ) : (
                  <Button
                    disabled={!form.getFieldValue('app') || !form.getFieldValue('member')}
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
