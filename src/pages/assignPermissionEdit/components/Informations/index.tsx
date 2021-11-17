import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

function Informations({ application, member }: any) {
  const { t } = useTranslation('common');

  return (
    <>
      <Typography fontWeight='bold' size='normal'>
        Informações
      </Typography>
      <TextField
        id='form-app'
        label={t('common.application')}
        placeholder={t('common.application')}
        name='app'
        disabled
        value={application.name}
      />
      <TextField
        id='form-member'
        label={t('common.member')}
        placeholder={t('common.member')}
        name='member'
        disabled
        value={member}
      />
    </>
  );
}

export default Informations;
