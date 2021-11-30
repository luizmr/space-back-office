import React, { useEffect, useState } from 'react';

// components
import PermissionGroupTable from './components/PermissionGroupTable';
import PanelHeader from 'components/panelHeader';

// utils
import { PermissionGroupDataOutput } from 'models/permissionGroup';
// import { PermissionGroupService } from 'services';
import mock from './mock.json';

const PermissionGroupPanel = () => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<PermissionGroupDataOutput[]>(mock);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // PermissionGroupService.getAll({appId: '', active: '1'})
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
    <div className='container-permission-panel'>
      <PanelHeader
        title={'permission-group.title'}
        subtitle={'permission-group.subtitle'}
        buttonPath={'/permission-groups/new'}
        buttonTitle={'permission-group.new-permission-group'}
      />
      <PermissionGroupTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default PermissionGroupPanel;
