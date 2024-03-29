import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material-ui/icons
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';
import TextField from '@eduzz/houston-ui/Forms/Text';
import phoneMask from '@eduzz/houston-forms/masks/phone';

// components
import ToastComponent from 'components/toast';

// services
import { CompanyService } from 'services';
import { useStateValue } from 'store/TokenProvider';
import jwt from 'jsonwebtoken';

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const FormSection = ({ currentStep, setCurrentStep }: Props) => {
  const { t } = useTranslation('common');
  const [{ token }] = useStateValue();
  const tokenUser = token ? token.split(' ')[1] : '';
  const user: any = jwt.decode(tokenUser);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('error.company-error');

  const form = useForm({
    initialValues: { name: '', phone: '', contact: '', email: user.Email },
    validationSchema: yup => {
      return yup.object().shape({
        name: yup.string(),
        email: yup.string().email().required(),
        phone: yup.string().min(10).required(),
        contact: yup.string().required()
      });
    },
    onSubmit: async values => {
      setSubmitting(true);
      const { name, phone, contact, email } = values;

      try {
        await CompanyService.post({
          name,
          email,
          phone,
          contact
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
                <TextField
                  name='name'
                  label={`${t('dashboard.company')}`}
                  id='form-name'
                  placeholder={`${t('company.company-name')}`}
                  maxLength={100}
                />
              )}

              {currentStep === 1 && (
                <>
                  <TextField
                    name='contact'
                    label={`* ${t('common.contact')}`}
                    id='form-contact'
                    placeholder={`${t('company.company-contact')}`}
                    maxLength={100}
                  />
                  <TextField
                    name='email'
                    label={'* E-mail'}
                    id='form-email'
                    placeholder={`${t('company.company-email')}`}
                    disabled
                    maxLength={100}
                  />
                  <TextField
                    name='phone'
                    label={`* ${t('common.phone')}`}
                    id='form-telefone'
                    placeholder={`${t('company.company-phone')}`}
                    mask={phoneMask}
                    maxLength={30}
                  />
                </>
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
                    disabled={
                      nextButton ||
                      form.isSubmitting ||
                      (form.getFieldValue('phone').length >= 1 && form.getFieldValue('phone').length < 10) ||
                      !form.isValid
                    }
                    type='submit'
                  >
                    {t('common.confirm')}
                  </Button>
                ) : (
                  <Button
                    disabled={currentStep === 0 ? (form.getFieldValue('name') === '' ? true : false) : false}
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
