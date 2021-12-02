import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';
import Switch from '@eduzz/houston-ui/Forms/Switch';

// utils
import { AppService } from 'services';
import ConvertToSlug from 'utils/convertToSlug';
import { PermissionGroupOutput } from 'models/permissionGroup';

type Props = {
  permissionGroup: PermissionGroupOutput;
  setPermissionGroup: React.Dispatch<React.SetStateAction<PermissionGroupOutput>>;
  slugValid: number;
  setSlugValid: React.Dispatch<React.SetStateAction<number>>;
};

function EditForm({ permissionGroup, setPermissionGroup, slugValid, setSlugValid }: Props) {
  const { t } = useTranslation('common');

  const handleAppChange = (key: string, value: any) => {
    setPermissionGroup({ ...permissionGroup, [key]: value });
  };

  const handleCheckSlug = (value: any): void => {
    if (value !== '') {
      AppService.checkSlug(value)
        .then(() => {
          setSlugValid(2);
        })
        .catch(() => {
          setSlugValid(3);
        });
    } else {
      setSlugValid(1);
    }
  };

  const handleOnBlur = (e: string) => {
    setPermissionGroup({ ...permissionGroup, slug: ConvertToSlug(e) });
    handleCheckSlug(e);
  };

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.specific-info')}
      </Typography>
      <TextField
        label={`* ${t('dashboard.permission-group')}`}
        id='form-name'
        placeholder={`${t('permissionGroup.permission-group-name')}`}
        value={permissionGroup.name}
        maxLength={50}
        onChange={e => handleAppChange('name', e)}
        onBlur={e => handleOnBlur(e)}
      />
      <TextField
        label={'Slug'}
        id='form-slug'
        className={`textfield-slug${slugValid}`}
        placeholder={`${t('permission-group.permission-group-slug')}`}
        helperText={
          slugValid === 1 ? '' : slugValid === 2 ? `${t('common.slug-available')}` : `${t('common.slug-unavailable')}`
        }
        onChange={e => handleAppChange('slug', e)}
        onBlur={e => {
          handleCheckSlug(e);
        }}
        value={permissionGroup.slug}
        maxLength={100}
      />
      <div className='form__switch'>
        <Typography fontWeight='semibold' size='normal'>
          {t('permission-group.permission-group-default')}
        </Typography>
        <Switch checked={permissionGroup.defaultGroup} onChange={e => handleAppChange('defaultGroup', e)} />
      </div>
      <div className='form__switch'>
        <Typography fontWeight='semibold' size='normal'>
          {t('permission-group.permission-group-active')}
        </Typography>
        <Switch checked={permissionGroup.active} onChange={e => handleAppChange('active', e)} />
      </div>
      <hr />
    </div>
  );
}

export default EditForm;
