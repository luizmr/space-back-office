import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

// utils
import { PermissionGroupOutput } from 'models/permissionGroup';

type Props = {
  permissionGroup: PermissionGroupOutput;
};

function Informations({ permissionGroup }: Props) {
  const { t } = useTranslation('common');

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.general-info')}
      </Typography>
      <TextField
        id='form-company'
        label={t('dashboard.company')}
        placeholder={t('dashboard.company')}
        disabled
        value={permissionGroup.app.company.name}
      />
      <TextField
        id='form-app'
        label={t('dashboard.app')}
        placeholder={t('dashboard.app')}
        disabled
        value={permissionGroup.app.name}
      />
      <hr />
    </div>
  );
}

export default Informations;
