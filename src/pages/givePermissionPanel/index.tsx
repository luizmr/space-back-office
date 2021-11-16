import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Table from '@eduzz/houston-ui/Table';
import Tooltip from '@eduzz/houston-ui/Tooltip';
import Typography from '@eduzz/houston-ui/Typography';
import Button from '@eduzz/houston-ui/Button';
import ButtonIcon from '@eduzz/houston-ui/ButtonIcon';
import Add from '@eduzz/houston-icons/Add';
import EditSolid from '@eduzz/houston-icons/EditSolid';

import { UsersDataOutput } from 'models/panel';

import mockUsers from './mock.json';

const GivePermissionPanel = () => {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [sort, setSort] = useState<any>(null);
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState<UsersDataOutput[]>(mockUsers);

  const onSort = useCallback((data: { field: string; direction: string }) => {
    setSort(data);
    setRows(rows => {
      return rows.sort((a, b) => {
        if ((a.updated_at ? a.updated_at : a.created_at) > (b.updated_at ? b.updated_at : b.created_at))
          return data.direction === 'asc' ? 1 : -1;
        if ((a.updated_at ? a.updated_at : a.created_at) == (b.updated_at ? b.updated_at : b.created_at)) return 0;
        return data.direction === 'asc' ? -1 : 1;
      });
    });
  }, []);

  return (
    <div className='container-permission-panel'>
      <div className='panel-header'>
        <Typography fontWeight='bold' size='large'>
          {t('givepermission.title')}
        </Typography>
        <Button
          startIcon={<Add />}
          onClick={() => {
            history.push('/give-permission/new');
          }}
        >
          <Typography>{t('givepermission.add-permission')}</Typography>
        </Button>
      </div>
      <div className='panel-header__sub-title'>
        <Typography fontWeight='regular' size='normal'>
          {t('givepermission.subtitle')}
        </Typography>
      </div>
      <Table stripedRows sort={sort} onSort={onSort}>
        <Table.Header>
          <Table.Column sortableField='date'>{t('common.date')}</Table.Column>
          <Table.Column>{t('common.application')}</Table.Column>
          <Table.Column>{t('common.permission-group')}</Table.Column>
          <Table.Column>{t('common.user')}</Table.Column>
          <Table.Column align='right'>{t('common.action')}</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Empty count={rows.length} />
          {rows.map((row, index) => (
            <Table.Row data={row} index={index} key={row.id}>
              <Table.Cell>{row.updated_at ? row.updated_at : row.created_at}</Table.Cell>
              <Table.Cell>{row.application}</Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.permissionGroup}</Table.Cell>
              <Table.Cell align='right'>
                <Tooltip placement='bottom' title={`${t('common.edit-permission')}`}>
                  <ButtonIcon
                    onClick={() => {
                      history.push(`give-permission/edit/${row.id}`);
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
