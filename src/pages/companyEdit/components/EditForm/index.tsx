import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';
import phoneMask from '@eduzz/houston-forms/masks/phone';

// utils
import { CompanyOutput } from 'models/company';

type Props = {
  company: CompanyOutput;
  setCompany: React.Dispatch<React.SetStateAction<CompanyOutput>>;
};

function EditForm({ company, setCompany }: Props) {
  const { t } = useTranslation('common');

  const handleCompanyChange = (key: string, value: string) => {
    setCompany({ ...company, [key]: value });
  };

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.specific-info')}
      </Typography>
      <TextField
        label={`* ${t('dashboard.company')}`}
        id='form-name'
        placeholder={`${t('company.company-name')}`}
        value={company.name}
        maxLength={100}
        onChange={e => handleCompanyChange('name', e)}
      />
      <TextField
        label={`* ${t('common.contact')}`}
        id='form-contact'
        placeholder={`${t('company.company-contact')}`}
        value={company.contact}
        maxLength={100}
        onChange={e => handleCompanyChange('contact', e)}
      />
      <TextField
        label={'* E-mail'}
        id='form-email'
        placeholder={`${t('company.company-email')}`}
        type='email'
        value={company.email}
        maxLength={100}
        onChange={e => handleCompanyChange('email', e)}
      />
      <TextField
        label={`* ${t('common.phone')}`}
        id='form-telefone'
        placeholder={`${t('company.company-phone')}`}
        mask={phoneMask}
        value={company.phone}
        maxLength={30}
        onChange={e => handleCompanyChange('phone', e)}
      />
      <hr />
    </div>
  );
}

export default EditForm;
