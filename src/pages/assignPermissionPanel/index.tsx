import React, { useEffect, useState } from 'react';

import { UsersDataOutput } from 'models/assignPermission';

import { MemberOfService } from 'services';
import AssignPermissionTable from './components/AssignPermissionTable';
import AssignPermissionHeader from './components/AssignPermissionHeader';
// import mock from './mock.json';

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
      <AssignPermissionHeader />
      <AssignPermissionTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default AssignPermissionPanel;
