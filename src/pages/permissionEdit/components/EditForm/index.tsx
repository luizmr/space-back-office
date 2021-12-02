import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';
import Switch from '@eduzz/houston-ui/Forms/Switch';

// utils
import { AppService } from 'services';
import ConvertToSlug from 'utils/convertToSlug';
import { PermissionOutput } from 'models/permission';

type Props = {
  permission: PermissionOutput;
  setPermission: React.Dispatch<React.SetStateAction<PermissionOutput>>;
  slugValid: number;
  setSlugValid: React.Dispatch<React.SetStateAction<number>>;
};

function EditForm({ permission, setPermission, slugValid, setSlugValid }: Props) {
  const { t } = useTranslation('common');

  const handleAppChange = (key: string, value: any) => {
    setPermission({ ...permission, [key]: value });
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
    setPermission({
      ...permission,
      slug: ConvertToSlug(e).startsWith(`${permission.permissionGroup.app.slug}-`)
        ? ConvertToSlug(e)
        : `${permission.permissionGroup.app.slug}-${ConvertToSlug(e)}`
    });
    handleCheckSlug(e);
  };

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.specific-info')}
      </Typography>
      <TextField
        label={`* ${t('dashboard.permission')}`}
        id='form-name'
        placeholder={`${t('permission.permission-name')}`}
        value={permission.name}
        maxLength={50}
        onChange={e => handleAppChange('name', e)}
        onBlur={e => handleOnBlur(e)}
      />
      <TextField
        label={'Slug'}
        id='form-slug'
        className={`textfield-slug${slugValid}`}
        placeholder={`${t('permission.permission-slug')}`}
        helperText={
          slugValid === 1 ? '' : slugValid === 2 ? `${t('common.slug-available')}` : `${t('common.slug-unavailable')}`
        }
        onChange={e => handleAppChange('slug', e)}
        onBlur={e => {
          handleCheckSlug(e);
        }}
        value={permission.slug}
        maxLength={100}
      />
      <div className='form__switch'>
        <Typography fontWeight='semibold' size='normal'>
          {t('permission.permission-authorize')}
        </Typography>
        <Switch checked={permission.authorize} onChange={e => handleAppChange('authorize', e)} />
      </div>
      <hr />
    </div>
  );
}

export default EditForm;
