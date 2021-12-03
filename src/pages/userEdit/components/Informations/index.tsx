import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

// utils
import { UserOutput } from 'models/user';

type Props = {
  user: UserOutput;
};

function Informations({ user }: Props) {
  const { t } = useTranslation('common');

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.general-info')}
      </Typography>
      <TextField
        id='form-company'
        label={t('dashboard.user')}
        placeholder={t('dashboard.user')}
        disabled
        value={user.user.name}
      />
      <TextField id='form-email' label={'E-mail'} placeholder={'E-mail'} disabled value={user.user.email} />
      <hr />
    </div>
  );
}

export default Informations;
