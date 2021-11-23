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

  useEffect(() => {
    MemberOfService.getAll()
      .then(response => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch(err => {
        setRows([]);
      });
    // setRows(mock);
  }, []);

  return (
    <div className='container-permission-panel'>
      <AssignPermissionHeader />
      <AssignPermissionTable rows={rows} setRows={setRows} />
    </div>
  );
};

export default AssignPermissionPanel;
