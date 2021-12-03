import { useTranslation } from 'react-i18next';

// material-ui

import Typography from '@eduzz/houston-ui/Typography';
import SelectField from '@eduzz/houston-ui/Forms/Select';
// utils
import { CompanyService } from 'services';
import { UserOutput } from 'models/user';
import { useEffect, useState } from 'react';
import { SelectFieldOutput } from 'models/assignPermission';
import createSelectArray from 'utils/createSelectArray';

type Props = {
  user: UserOutput;
  setUser: React.Dispatch<React.SetStateAction<UserOutput>>;
};

function EditForm({ user, setUser }: Props) {
  const { t } = useTranslation('common');
  const [companies, setCompanies] = useState<SelectFieldOutput[]>([]);

  const handleUserChange = (value: any) => {
    const companyFound = companies.find((obj: SelectFieldOutput) => obj.value === value);
    setUser({
      ...user,
      company: {
        id: value,
        name: companyFound ? companyFound.label : ''
      }
    });
  };

  useEffect(() => {
    CompanyService.getAll()
      .then(response => {
        setCompanies(createSelectArray(response.data));
      })
      .catch(err => {
        setCompanies([]);
      });
  }, []);

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.specific-info')}
      </Typography>
      <SelectField
        id='company-select'
        name='companyId'
        label={t('dashboard.company')}
        options={[{ value: '0', label: t('company.select-company') }, ...companies]}
        value={user.company.id}
        onChange={e => handleUserChange(e)}
      />
      <hr />
    </div>
  );
}

export default EditForm;
