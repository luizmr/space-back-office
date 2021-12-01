import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material-ui/icons
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';
import TextField from '@eduzz/houston-ui/Forms/Text';
import SelectField from '@eduzz/houston-ui/Forms/Select';
import Switch from '@eduzz/houston-ui/Forms/Switch';

// components
import ToastComponent from 'components/toast';

// utils
import { AppService } from 'services';
// import { slugError } from 'utils/errorDic';
import { SelectFieldOutput } from 'models/assignPermission';
import ConvertToSlug from 'utils/convertToSlug';

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
  const [errorMessage, setErrorMessage] = useState<string>('error.permission-error');
  const [slugValid, setSlugValid] = useState<number>(1);

  const form = useForm({
    initialValues: { companyId: '0', name: '', defaultAccess: true, slug: '' },
    validationSchema: yup => {
      return yup.object().shape({
        companyId: yup.string(),
        name: yup.string().required(),
        slug: yup.string(),
        defaultAccess: yup.boolean()
      });
    },
    onSubmit: async values => {
      setSubmitting(true);
      const { name, companyId, slug, defaultAccess } = values;

      // try {
      //   await AppService.post({
      //     name,
      //     companyId,
      //     slug,
      //     defaultAccess
      //   });
      //   setTimeout(() => {
      setSubmitting(false);
      setCurrentStep(2);
      //   }, 1000);
      // } catch (error: any) {
      //   const errorSlug = error.response.data.detail.split(':');
      //   const foundError = slugError.find(({ slug, api }) => api === errorSlug[0] && slug === errorSlug[2]);
      //   if (foundError) {
      //     setErrorMessage(t(`${foundError.message}`));
      //   }
      //   setSubmitting(false);
      //   setOpen(true);
      // }
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckSlug = (value: any): void => {
    if (value !== '') {
      AppService.checkSlug(value)
        .then(() => {
          setSlugValid(2);
        })
        .catch(() => {
          setSlugValid(3);
        });
    } else {
      setSlugValid(1);
    }
  };

  const handleOnBlur = (e: string) => {
    form.setFieldValue('slug', ConvertToSlug(e));
    handleCheckSlug(e);
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
                <>
                  <TextField
                    name='name'
                    label={`* ${t('dashboard.app')}`}
                    id='form-name'
                    placeholder={`${t('app.app-name')}`}
                    onBlur={e => handleOnBlur(e)}
                    maxLength={100}
                  />
                  <TextField
                    name='slug'
                    label={'Slug'}
                    id='form-slug'
                    className={`textfield-slug${slugValid}`}
                    placeholder={`${t('app.app-slug')}`}
                    helperText={
                      slugValid === 1
                        ? ''
                        : slugValid === 2
                        ? `${t('common.slug-available')}`
                        : `${t('common.slug-unavailable')}`
                    }
                    onBlur={e => {
                      handleCheckSlug(e);
                    }}
                    maxLength={200}
                  />
                  <div className='form__switch'>
                    <Typography fontWeight='semibold' size='normal'>
                      {t('app.app-default')}
                    </Typography>
                    <Switch name='defaultAccess' />
                  </div>
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
                    disabled={nextButton || form.isSubmitting || !form.isValid || slugValid === 2}
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
