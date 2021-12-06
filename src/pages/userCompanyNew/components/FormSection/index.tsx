import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material-ui/icons
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';
import TextField from '@eduzz/houston-ui/Forms/Text';
import SelectField from '@eduzz/houston-ui/Forms/Select';

// components
import ToastComponent from 'components/toast';

// utils
import { UserCompanyService } from 'services';
import { SelectFieldOutput } from 'models/assignPermission';

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  companies: Array<SelectFieldOutput>;
};

const FormSection = ({ currentStep, setCurrentStep, companies }: Props) => {
  const { t } = useTranslation('common');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('error.user-error');

  const form = useForm({
    initialValues: { companyId: '0', email: '' },
    validationSchema: yup => {
      return yup.object().shape({
        companyId: yup.string(),
        email: yup.string().email().required()
      });
    },
    onSubmit: async values => {
      setSubmitting(true);
      const { email, companyId } = values;

      try {
        await UserCompanyService.post({
          email,
          companyId
        });
        setTimeout(() => {
          setSubmitting(false);
          setCurrentStep(2);
        }, 1000);
      } catch (error: any) {
        setSubmitting(false);
        setOpen(true);
      }
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='general-new__new-form'>
        <div className='general-new__new-form__body'>
          <div className='general-new__new-form__form'>
            <Form context={form}>
              {currentStep === 0 && (
                <SelectField
                  id='company-select'
                  name='companyId'
                  label={t('dashboard.company')}
                  options={[{ value: '0', label: t('company.select-company') }, ...companies]}
                />
              )}

              {currentStep === 1 && (
                <TextField
                  name='email'
                  label={'* E-mail'}
                  id='form-email'
                  placeholder={`${t('user.user-email')}`}
                  type='email'
                  maxLength={100}
                />
              )}

              <div className='general-new__new-form__submit'>
                {currentStep === 1 && (
                  <Button
                    variant='text'
                    onClick={() => {
                      setNextButton(true);
                      setCurrentStep(currentStep - 1);
                    }}
                    disabled={submitting}
                  >
                    {t('common.previous')}
                  </Button>
                )}
                {currentStep === 1 ? (
                  <Button
                    loading={submitting}
                    disabled={nextButton || form.isSubmitting || !form.isValid}
                    type='submit'
                  >
                    {t('common.confirm')}
                  </Button>
                ) : (
                  <Button
                    disabled={currentStep === 0 ? (form.getFieldValue('companyId') === '0' ? true : false) : false}
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                      if (currentStep === 0) {
                        setTimeout(() => {
                          setNextButton(false);
                        }, 10);
                      }
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
      <ToastComponent open={open} handleClose={handleClose} string={errorMessage} />
    </>
  );
};

export default FormSection;
