import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@eduzz/houston-ui/Typography';
import { FormGroup, Checkbox } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// utils
// import mock from 'pages/assignPermissionNew/mock.json';
import { PermissionsOutput, PermissionsStateOutput } from 'models/assignPermission';
import { PermissionGroupService } from 'services';

function MemberPermissions({ group, permissions, setPermissions }: any) {
  const { t } = useTranslation('common');

  const handleChangePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    const permissionsArray: PermissionsStateOutput[] = [...permissions];
    const newPermissionsArray: Array<PermissionsOutput> = [];
    const finalPermissionsArray: PermissionsStateOutput[] = [];

    permissionsArray.forEach(obj => {
      if (obj.permissionGroupId === group) {
        obj.permissions.forEach(el => {
          if (el.slug === event.target.name) {
            newPermissionsArray.push({
              ...el,
              authorize: event.target.checked
            });
          } else {
            newPermissionsArray.push(el);
          }
        });
      } else {
        finalPermissionsArray.push(obj);
      }
    });

    setPermissions([...finalPermissionsArray, { permissionGroupId: group, permissions: newPermissionsArray }]);
  };

  useEffect(() => {
    if (group.length) {
      // const permissionsFound = mock.permissions.find(obj => obj.groupId === group);
      // setPermissions(permissionsFound!.permissions);
      const groupSaved = permissions.find((obj: PermissionsStateOutput) => obj.permissionGroupId === group);
      if (!groupSaved) {
        PermissionGroupService.getPermission(group)
          .then(response => {
            setPermissions([...permissions, { permissionGroupId: group, permissions: response.data }]);
          })
          .catch(err => {
            setPermissions([...permissions]);
          });
      }
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
            {permissions.map((obj: PermissionsStateOutput) => {
              if (obj.permissionGroupId === group) {
                return (
                  <>
                    {obj.permissions.map((el: PermissionsOutput) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={el.authorize}
                            onChange={e => {
                              handleChangePermission(e);
                            }}
                            name={el.slug}
                          />
                        }
                        label={el.name}
                        key={el.id}
                      />
                    ))}
                  </>
                );
              }
            })}
          </FormGroup>
        </FormControl>
      ) : (
        <span></span>
      )}
    </>
  );
}

export default MemberPermissions;
