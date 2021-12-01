import React, { useEffect, useState } from 'react';

// components
import CompanyTable from './components/CompanyTable';
import PanelHeader from 'components/panelHeader';

// utils
import { CompanyDataOutput } from 'models/company';
import { CompanyService } from 'services';
import mock from './mock.json';

const CompanyPanel = () => {
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<CompanyDataOutput[]>(mock);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    CompanyService.getAll()
      .then(response => {
        setRows(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setRows([]);
      });
  }, []);

  return (
    <div className='general-panel'>
      <PanelHeader
        title={'company.title'}
        subtitle={'company.subtitle'}
        buttonPath={'/companies/new'}
        buttonTitle={'company.new-company'}
      />
      <CompanyTable rows={rows} setRows={setRows} loading={loading} />
    </div>
  );
};

export default CompanyPanel;
