import React, { useEffect, useState } from 'react';

// components
import UserTable from './components/UserTable';
import PanelHeader from 'components/panelHeader';

// utils
import { UserCompanyDataOutput } from 'models/userCompany';
// import { UserCompanyService } from 'services';
import mock from './mock.json';

const UserCompanyPanel = () => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<UserCompanyDataOutput[]>(mock);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // UserCompanyService.getAll({companyId: ''})
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
        title={'user.title'}
        subtitle={'user.subtitle'}
        buttonPath={'/users/new'}
        buttonTitle={'user.new-user'}
      />
      <UserTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default UserCompanyPanel;
