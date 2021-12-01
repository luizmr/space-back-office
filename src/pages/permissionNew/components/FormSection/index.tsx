import { useEffect, useState } from 'react';
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
import { PermissionService, AppService } from 'services';
import { SelectFieldOutput } from 'models/assignPermission';
import ConvertToSlug from 'utils/convertToSlug';

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  apps: Array<SelectFieldOutput>;
  appSlug: string;
};

const FormSection = ({ currentStep, setCurrentStep, apps, appSlug }: Props) => {
  const { t } = useTranslation('common');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('error.permission-error');
  const [slugValid, setSlugValid] = useState<number>(1);
  const [groups, setGroups] = useState<SelectFieldOutput[]>([]);

  const form = useForm({
    initialValues: { appId: '0', permissionGroupId: '0', name: '', slug: '', authorize: true },
    validationSchema: yup => {
      return yup.object().shape({
        appId: yup.string(),
        permissionGroupId: yup.string(),
        name: yup.string().required(),
        slug: yup.string(),
        authorize: yup.boolean()
      });
    },
    onSubmit: async values => {
      setSubmitting(true);
      const { name, permissionGroupId, slug, authorize } = values;

      // try {
      //   await PermissionService.post({
      //     name,
      //     permissionGroupId,
      //     slug,
      //     authorize
      //   });
      //   setTimeout(() => {
      setSubmitting(false);
      setCurrentStep(2);
      //   }, 1000);
      // } catch (error: any) {
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
      PermissionService.checkSlug(value)
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
    form.setFieldValue(
      'slug',
      ConvertToSlug(e).startsWith(`${appSlug}-`) ? ConvertToSlug(e) : `${appSlug}-${ConvertToSlug(e)}`
    );
    handleCheckSlug(e);
  };

  useEffect(() => {
    if (form.getFieldValue('appId') === '0') {
      setGroups([]);
    } else {
      AppService.getPermissionsGroup(form.getFieldValue('appId'), { active: '1' })
        .then(response => {
          setGroups(response.data);
        })
        .catch(err => {
          setGroups([]);
        });
    }
  }, [form.getFieldValue('appId')]);

  return (
    <>
      <div className='general-new__new-form'>
        <div className='general-new__new-form__body'>
          <div className='general-new__new-form__form'>
            <Form context={form}>
              {currentStep === 0 && (
                <SelectField
                  id='app-select'
                  name='appId'
                  label={t('dashboard.app')}
                  options={[{ value: '0', label: t('app.select-app') }, ...apps]}
                />
              )}

              {currentStep === 1 && (
                <SelectField
                  id='permission-group-select'
                  name='permission-groupId'
                  label={t('dashboard.permission-group')}
                  options={[{ value: '0', label: t('permission-group.permission-group-app') }, ...groups]}
                />
              )}

              {currentStep === 2 && (
                <>
                  <TextField
                    name='name'
                    label={`* ${t('dashboard.permission-group')}`}
                    id='form-name'
                    placeholder={`${t('permission-group.permission-group-name')}`}
                    onBlur={e => handleOnBlur(e)}
                    maxLength={200}
                  />
                  <TextField
                    name='slug'
                    label={'Slug'}
                    id='form-slug'
                    className={`textfield-slug${slugValid}`}
                    placeholder={`${t('permission-group.permission-group-slug')}`}
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
                    maxLength={400}
                  />
                  <div className='form__switch'>
                    <Typography fontWeight='semibold' size='normal'>
                      {t('permission-group.permission-group-authorize')}
                    </Typography>
                    <Switch name='authorize' />
                  </div>
                </>
              )}

              <div className='general-new__new-form__submit'>
                {(currentStep === 1 || currentStep === 2) && (
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
                {currentStep === 2 ? (
                  <Button
                    loading={submitting}
                    disabled={nextButton || form.isSubmitting || !form.isValid || slugValid === 2}
                    type='submit'
                  >
                    {t('common.confirm')}
                  </Button>
                ) : (
                  <Button
                    disabled={
                      currentStep === 0
                        ? form.getFieldValue('appId') === '0'
                          ? true
                          : false
                        : form.getFieldValue('permissionGroupId') === '0'
                        ? true
                        : false
                    }
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
