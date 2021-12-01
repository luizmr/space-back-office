import React, { useEffect, useState } from 'react';

// components
import PermissionTable from './components/PermissionTable';
import PanelHeader from 'components/panelHeader';

// utils
import { PermissionDataOutput } from 'models/permission';
// import { PermissionService } from 'services';
import mock from './mock.json';

const PermissionPanel = () => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<PermissionDataOutput[]>(mock);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // PermissionService.getAll({permissionGroupId: ''})
    //   .then(response => {
    //     setRows(response.data);
    setLoading(false);
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setRows([]);
    //   });
  }, []);

  return (
    <div className='general-panel'>
      <PanelHeader
        title={'permission.title'}
        subtitle={'permission.subtitle'}
        buttonPath={'/permissions/new'}
        buttonTitle={'permission.new-permission'}
      />
      <PermissionTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default PermissionPanel;
