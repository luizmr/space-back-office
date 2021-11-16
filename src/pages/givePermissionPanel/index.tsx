import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Table from '@eduzz/houston-ui/Table';
import Tooltip from '@eduzz/houston-ui/Tooltip';
import Typography from '@eduzz/houston-ui/Typography';
import ButtonIcon from '@eduzz/houston-ui/ButtonIcon';
import EditSolid from '@eduzz/houston-icons/EditSolid';

import { UsersDataOutput } from 'models/panel';

const GivePermissionPanel = () => {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [sort, setSort] = useState<any>(null);
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<UsersDataOutput[]>([
    { id: 1, date: '16/11/2021', application: 'Vitrine', name: 'Valbl', permissionGroup: 'Colaborador' },
    { id: 2, date: '15/11/2021', application: 'Vitrine', name: 'Space', permissionGroup: 'Colaborador' },
    { id: 3, date: '14/11/2021', application: 'Vitrine', name: 'SpacePartner', permissionGroup: 'Parceiro' }
  ]);

  const onSort = useCallback((data: { field: string; direction: string }) => {
    setSort(data);
    setRows(rows => {
      return rows.sort((a, b) => {
        if (a.date > b.date) return data.direction === 'asc' ? 1 : -1;
        if (a.date == b.date) return 0;
        return data.direction === 'asc' ? -1 : 1;
      });
    });
  }, []);

  return (
    <div className='container-permission-panel'>
      <Typography fontWeight='bold' size='large'>
        {t('givepermission.title')}
      </Typography>
      <Typography fontWeight='regular' size='normal'>
        {t('givepermission.subtitle')}
      </Typography>
      <Table stripedRows sort={sort} onSort={onSort}>
        <Table.Header>
          <Table.Column sortableField='date'>{t('common.date')}</Table.Column>
          <Table.Column>{t('common.application')}</Table.Column>
          <Table.Column>{t('common.name')}</Table.Column>
          <Table.Column>{t('common.permission-group')}</Table.Column>
          <Table.Column align='right'>{t('common.edit')}</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Empty count={rows.length} />
          {rows.map((row, index) => (
            <Table.Row data={row} index={index} key={row.id}>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>{row.application}</Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.permissionGroup}</Table.Cell>
              <Table.Cell align='right'>
                <Tooltip placement='bottom' title={`${t('common.edit-permission')}`}>
                  <ButtonIcon
                    onClick={() => {
                      history.push(`/edit/${row.id}`);
                    }}
                  >
                    <EditSolid />
                  </ButtonIcon>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        {/* <Table.Pagination
          page={page}
          perPage={perPage}
          total={10}
          onChangePage={setPage}
          onChangePerPage={setPerPage}
        /> */}
      </Table>
    </div>
  );
};

export default GivePermissionPanel;
