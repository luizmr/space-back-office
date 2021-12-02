import { useEffect, useState } from 'react';
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
import { PermissionsStateOutput, SelectFieldOutput } from 'models/assignPermission';
import { AppService, CompanyService, MemberOfService } from 'services';
import createSelectArray from 'utils/createSelectArray';

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
  const [errorMessage, setErrorMessage] = useState<string>('error.permission-assignment-error');
  const [group, setGroup] = useState<string>('');
  const [permissions, setPermissions] = useState<PermissionsStateOutput[]>([]);
  const [apps, setApps] = useState<SelectFieldOutput[]>([]);
  const [members, setMembers] = useState<SelectFieldOutput[]>([]);

  const form = useForm({
    initialValues: { app: '0', member: '0', companyId: '0' },
    validationSchema: yup => {
      return yup.object().shape({
        app: yup.string(),
        member: yup.string(),
        companyId: yup.string()
      });
    },
    onSubmit: async values => {
      setSubmitting(true);
      const { member, app } = values;

      const permissionsFalseArray: { permissionId: string; authorize: boolean }[] = [];

      permissions.forEach(obj => {
        if (obj.permissionGroupId === group) {
          obj.permissions.forEach(el => {
            !el.authorize && permissionsFalseArray.push({ permissionId: el.id, authorize: false });
          });
        }
      });

      try {
        await MemberOfService.post({
          userCompanyId: member,
          permissionGroupId: group,
          permissions: permissionsFalseArray,
          appId: app
        });
        setTimeout(() => {
          setSubmitting(false);
          setCurrentStep(3);
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

  useEffect(() => {
    if (form.getFieldValue('companyId') === '0') {
      setApps([]);
    } else {
      AppService.getAll({ companyId: form.getFieldValue('companyId') })
        .then(response => {
          setApps(createSelectArray(response.data));
        })
        .catch(err => {
          setApps([]);
        });
    }
  }, [form.getFieldValue('companyId')]);

  useEffect(() => {
    if (form.getFieldValue('app') === '0') {
      setMembers([]);
    } else {
      CompanyService.getUsers(form.getFieldValue('companyId'))
        .then(response => {
          setMembers(createSelectArray(response.data));
        })
        .catch(err => {
          setMembers([]);
        });
    }
  }, [form.getFieldValue('app')]);

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
                <SelectField
                  id='app-select'
                  name='app'
                  label={t('dashboard.app')}
                  options={[{ value: '0', label: t('app.select-app') }, ...apps]}
                />
              )}

              {currentStep === 2 && (
                <SelectField
                  id='member-select'
                  name='member'
                  label={t('common.member')}
                  options={[{ value: '0', label: t('assignpermission.select-member') }, ...members]}
                />
              )}

              {currentStep === 3 && (
                <>
                  <MemberGroup group={group} setGroup={setGroup} appId={form.getFieldValue('app')} />
                  <hr />
                  <MemberPermissions permissions={permissions} group={group} setPermissions={setPermissions} />
                </>
              )}

              <div className='general-new__new-form__submit'>
                {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
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
                    disabled={
                      nextButton || !form.isValid || form.isSubmitting || group.length === 0 || permissions.length === 0
                    }
                    type='submit'
                  >
                    {t('assignpermission.finish-assignment')}
                  </Button>
                ) : (
                  <Button
                    disabled={
                      currentStep === 0
                        ? form.getFieldValue('companyId') === '0'
                          ? true
                          : false
                        : currentStep === 1
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
      <ToastComponent open={open} handleClose={handleClose} string={errorMessage} />
    </>
  );
};

export default FormSection;
