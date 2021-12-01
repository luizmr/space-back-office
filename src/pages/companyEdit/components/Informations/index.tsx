import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

// utils
import { CompanyOutput } from 'models/company';

type Props = {
  company: CompanyOutput;
};

function Informations({ company }: Props) {
  const { t } = useTranslation('common');

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.informations')}
      </Typography>
      <TextField
        id='form-public-token'
        label={'PUBLIC TOKEN'}
        placeholder={'PUBLIC TOKEN'}
        disabled
        value={company.publicToken}
      />
      <TextField
        id='form-public-key'
        label={'PUBLIC KEY'}
        placeholder={'PUBLIC KEY'}
        disabled
        value={company.publicKey}
      />
      <TextField
        id='form-private-key'
        label={'PRIVATE KEY'}
        placeholder={'PRIVATE KEY'}
        disabled
        value={company.privateKey}
      />
      <hr />
    </div>
  );
}

export default Informations;
