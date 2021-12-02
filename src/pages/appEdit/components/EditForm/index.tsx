import { useTranslation } from 'react-i18next';

// material-ui
import TextField from '@eduzz/houston-ui/Forms/Text';
import Typography from '@eduzz/houston-ui/Typography';
import Switch from '@eduzz/houston-ui/Forms/Switch';

// utils
import { AppService } from 'services';
import ConvertToSlug from 'utils/convertToSlug';
import { AppOutput } from 'models/app';

type Props = {
  app: AppOutput;
  setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
  slugValid: number;
  setSlugValid: React.Dispatch<React.SetStateAction<number>>;
};

function EditForm({ app, setApp, slugValid, setSlugValid }: Props) {
  const { t } = useTranslation('common');

  const handleAppChange = (key: string, value: any) => {
    setApp({ ...app, [key]: value });
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
    setApp({ ...app, slug: ConvertToSlug(e) });
    handleCheckSlug(e);
  };

  return (
    <div className='general-edit__infos'>
      <Typography fontWeight='bold' size='normal'>
        {t('common.specific-info')}
      </Typography>
      <TextField
        label={`* ${t('dashboard.app')}`}
        id='form-name'
        placeholder={`${t('app.app-name')}`}
        value={app.name}
        maxLength={100}
        onChange={e => handleAppChange('name', e)}
        onBlur={e => handleOnBlur(e)}
      />
      <TextField
        label={'Slug'}
        id='form-slug'
        className={`textfield-slug${slugValid}`}
        placeholder={`${t('app.app-slug')}`}
        helperText={
          slugValid === 1 ? '' : slugValid === 2 ? `${t('common.slug-available')}` : `${t('common.slug-unavailable')}`
        }
        onChange={e => handleAppChange('slug', e)}
        onBlur={e => {
          handleCheckSlug(e);
        }}
        value={app.slug}
        maxLength={200}
      />
      <div className='form__switch'>
        <Typography fontWeight='semibold' size='normal'>
          {t('app.app-default')}
        </Typography>
        <Switch checked={app.defaultAccess} onChange={e => handleAppChange('defaultAccess', e)} />
      </div>
      <hr />
    </div>
  );
}

export default EditForm;
