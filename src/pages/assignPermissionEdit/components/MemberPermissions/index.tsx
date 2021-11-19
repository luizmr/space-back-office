import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@eduzz/houston-ui/Typography';
import { FormGroup, Checkbox } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// utils
import mock from 'pages/assignPermissionNew/mock.json';
import { PermissionsOutput } from 'models/assignPermission';

// services
// import { AppService, MemberOfService } from 'services';

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
      const permissionsFound = mock.permissions.find(obj => obj.groupId === group)!;
      const newPermissionsArray: Array<PermissionsOutput> = [];
      permissionsFound.permissions.forEach((permission: any) => {
        const foundPermission = permissions.find((userPermission: any) => permission.slug === userPermission.slug);
        if (foundPermission) {
          newPermissionsArray.push(foundPermission);
        } else {
          newPermissionsArray.push(permission);
        }
      });
      setPermissions(newPermissionsArray);
      // setPermissions(permissionsFound!.permissions);
    } else {
      setPermissions([]);
    }
  }, [group]);

  useEffect(() => {
    //  AppService.getPermissionsGroup
    // const newPermissionsArray: Array<PermissionsOutput> = [];
    // mock.permissions[0].permissions.forEach(permission => {
    //   const foundPermission = permissions.find((userPermission: any) => permission.id === userPermission.id);
    //   if (foundPermission) {
    //     newPermissionsArray.push(foundPermission);
    //   } else {
    //     newPermissionsArray.push(permission);
    //   }
    // });
    // setPermissions(newPermissionsArray);
  }, []);

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
                    color='primary'
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
