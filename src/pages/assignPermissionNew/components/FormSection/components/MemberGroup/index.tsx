import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@eduzz/houston-ui/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// utils
import { GroupsOutput } from 'models/assignPermission';
// import mock from 'pages/assignPermissionNew/mock.json';
import { AppService } from 'services';

function MemberGroup({ group, setGroup, appId }: any) {
  const { t } = useTranslation('common');
  const [groups, setGroups] = useState<Array<GroupsOutput>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((event.target as HTMLInputElement).value);
  };

  // useEffect(() => {
  //   if (group.length > 0) {

  // const groupsFound = mock.groups.find(obj => obj.appId === appId);
  // setGroups(groupsFound!.groups);
  //   }
  // }, [group]);

  useEffect(() => {
    if (appId !== 0) {
      // groupsFound = mock.groups.find(obj => obj.appId === appId);
      // setGroups(groupsFound!.groups);
      AppService.getPermissionsGroup(appId, { active: '1' })
        .then(response => {
          setGroups(response.data);
        })
        .catch(err => {
          setGroups([]);
        });
    } else {
      setGroups([]);
    }
    setGroup('');
  }, [appId]);

  return (
    <>
      <div className='form__permission-step'>
        <Typography fontWeight='bold' size='normal'>
          {t('assignpermission.group')}
        </Typography>
        <Typography fontWeight='regular' size='normal'>
          {t('assignpermission.group-description')}
        </Typography>
      </div>
      <FormControl component='fieldset'>
        <RadioGroup aria-label='group' name='group' value={group} onChange={handleChange} className='form__form-group'>
          {groups.map(obj => (
            <FormControlLabel value={obj.id} control={<Radio color='primary' />} label={obj.name} key={obj.id} />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default MemberGroup;
