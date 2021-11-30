import React, { useEffect, useState } from 'react';

// components
import AssignPermissionTable from './components/AssignPermissionTable';
import PanelHeader from 'components/panelHeader';

// utils
import { UsersDataOutput } from 'models/assignPermission';
import { MemberOfService } from 'services';

const AssignPermissionPanel = () => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<UsersDataOutput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    MemberOfService.getAll()
      .then(response => {
        setRows(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setRows([]);
      });
  }, []);

  return (
    <div className='container-permission-panel'>
      <PanelHeader
        title={'assignpermission.title'}
        subtitle={'assignpermission.subtitle'}
        buttonPath={'/assign-permissions/new'}
        buttonTitle={'dashboard.assign-permission'}
      />
      <AssignPermissionTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default AssignPermissionPanel;
