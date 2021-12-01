import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

// utils
import { AppOutput } from 'models/app';

type Props = {
  app: AppOutput;
};

function Informations({ app }: Props) {
  const { t } = useTranslation('common');

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.informations')}
      </Typography>
      <TextField
        id='form-company'
        label={t('dashboard.company')}
        placeholder={t('dashboard.company')}
        disabled
        value={app.company.name}
      />
      <hr />
    </div>
  );
}

export default Informations;
