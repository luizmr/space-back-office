import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@eduzz/houston-ui/Typography';
import { FormGroup, Checkbox } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// utils
// import mock from 'pages/assignPermissionNew/mock.json';
import { PermissionsOutput } from 'models/assignPermission';
import { PermissionGroupService } from 'services';

function MemberPermissions({ group, permissions, setPermissions }: any) {
  const { t } = useTranslation('common');

  const handleChangePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    const permissionsArray = [...permissions];
    const newPermissionsArray: Array<PermissionsOutput> = [];

    permissionsArray.forEach(obj => {
      if (obj.slug === event.target.name) {
        newPermissionsArray.push({
          ...obj,
          authorize: event.target.checked
        });
      } else {
        newPermissionsArray.push(obj);
      }
    });

    setPermissions(newPermissionsArray);
  };

  useEffect(() => {
    if (group.length) {
      // const permissionsFound = mock.permissions.find(obj => obj.groupId === group);
      // setPermissions(permissionsFound!.permissions);
      PermissionGroupService.getPermission(group)
        .then(response => {
          setPermissions(response.data);
        })
        .catch(err => {
          setPermissions([]);
        });
    } else {
      setPermissions([]);
    }
  }, [group]);

  return (
    <>
      {permissions.length > 0 ? (
        <FormControl
          component='fieldset'
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          <div className='form__permission-step'>
            <Typography fontWeight='bold' size='normal'>
              {t('assignpermission.permissions')}
            </Typography>
            <Typography fontWeight='regular' size='normal'>
              {t('assignpermission.permissions-description')}
            </Typography>
          </div>

          <FormGroup className='form__form-group'>
            {permissions.map((obj: PermissionsOutput) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={obj.authorize}
                    onChange={e => {
                      handleChangePermission(e);
                    }}
                    name={obj.slug}
                  />
                }
                label={obj.name}
                key={obj.id}
              />
            ))}
          </FormGroup>
        </FormControl>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default MemberPermissions;
