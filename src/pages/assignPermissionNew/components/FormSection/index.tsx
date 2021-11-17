import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// material-ui/icons
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import useForm from '@eduzz/houston-forms/useForm';
import SelectField from '@eduzz/houston-ui/Forms/Select';

// components
import ToastComponent from 'components/toast';
import MemberGroup from './components/MemberGroup';
import MemberPermissions from './components/MemberPermissions';

// models
import { PermissionsOutput, SelectFieldOutput } from 'models/assignPermission';

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
  const [group, setGroup] = useState<string>('');
  const [permissions, setPermissions] = useState<Array<PermissionsOutput>>([]);

  const form = useForm({
    initialValues: { app: '0', member: '0' },
    validationSchema: yup => {
      return yup.object().shape({
        app: yup.string(),
        member: yup.string()
      });
    },
    onSubmit: async values => {
      // setSubmitting(true);
      const { app, member } = values;
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
      <div className='assign-permission__new-form'>
        <div className='assign-permission__new-form__body'>
          <div className='assign-permission__new-form__form'>
            <Form context={form}>
              {currentStep === 0 && (
                <SelectField
                  id='app-select'
                  name='app'
                  label={t('common.app')}
                  options={[{ value: '0', label: t('assignpermission.select-app') }, ...apps]}
                />
              )}

              {currentStep === 1 && (
                <SelectField
                  id='member-select'
                  name='member'
                  label={t('common.member')}
                  options={[{ value: '0', label: t('assignpermission.select-member') }, ...members]}
                />
              )}

              {currentStep === 2 && (
                <>
                  <MemberGroup group={group} setGroup={setGroup} appId={form.getFieldValue('app')} />
                  <hr />
                  <MemberPermissions permissions={permissions} group={group} setPermissions={setPermissions} />
                </>
              )}

              <div className='assign-permission__new-form__submit'>
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
                {currentStep === 2 ? (
                  <Button
                    loading={submitting}
                    disabled={nextButton || !form.isValid || form.isSubmitting || group.length === 0}
                    type='submit'
                  >
                    {t('assignpermission.finish-assignment')}
                  </Button>
                ) : (
                  <Button
                    disabled={
                      currentStep === 0
                        ? form.getFieldValue('app') === '0'
                          ? true
                          : false
                        : form.getFieldValue('member') === '0'
                        ? true
                        : false
                    }
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                      if (currentStep === 1) {
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
      <ToastComponent open={open} handleClose={handleClose} string={t('error.permission-error')} />
    </>
  );
};

export default FormSection;
