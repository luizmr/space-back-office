import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';

// utils
import { PermissionOutput } from 'models/permission';

type Props = {
  permission: PermissionOutput;
};

function Informations({ permission }: Props) {
  const { t } = useTranslation('common');

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.general-info')}
      </Typography>
      <TextField
        id='form-app'
        label={t('dashboard.app')}
        placeholder={t('dashboard.app')}
        disabled
        value={permission.permissionGroup.app.name}
      />
      <TextField
        id='form-permission-group'
        label={t('dashboard.permission-group')}
        placeholder={t('dashboard.permission-group')}
        disabled
        value={permission.permissionGroup.name}
      />
      <hr />
    </div>
  );
}

export default Informations;
