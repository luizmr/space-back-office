import React, { useEffect, useState } from 'react';

// components
import AppTable from './components/AppTable';
import PanelHeader from 'components/panelHeader';

// utils
import { AppDataOutput } from 'models/app';
// import { AppService } from 'services';
import mock from './mock.json';

const AppPanel = () => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<AppDataOutput[]>(mock);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // AppService.getAll({companyId: ''})
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
      <PanelHeader title={'app.title'} subtitle={'app.subtitle'} buttonPath={'/apps/new'} buttonTitle={'app.new-app'} />
      <AppTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default AppPanel;
