import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

function Informations({ application, member }: any) {
  const { t } = useTranslation('common');

  return (
    <>
      <Typography fontWeight='bold' size='normal'>
        {t('common.informations')}
      </Typography>
      <TextField
        id='form-app'
        label={t('dashboard.app')}
        placeholder={t('dashboard.app')}
        disabled
        value={application}
      />
      <TextField id='form-member' label={t('common.member')} placeholder={t('common.member')} disabled value={member} />
    </>
  );
}

export default Informations;
