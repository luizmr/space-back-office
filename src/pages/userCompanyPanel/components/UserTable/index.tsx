import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Table from '@eduzz/houston-ui/Table';
import Tooltip from '@eduzz/houston-ui/Tooltip';
import ButtonIcon from '@eduzz/houston-ui/ButtonIcon';
import EditSolid from '@eduzz/houston-icons/EditSolid';
import { FormataStringData } from 'utils/formataStringData';
import { UserCompanyDataOutput } from 'models/userCompany';

type Props = {
  setRows: React.Dispatch<React.SetStateAction<UserCompanyDataOutput[]>>;
  rows: UserCompanyDataOutput[];
  loading: boolean;
};

const UserTable = ({ setRows, rows, loading }: Props) => {
  const { t } = useTranslation('common');
  const history = useHistory();
  const [sort, setSort] = useState<any>(null);

  const onSort = useCallback((data: { field: string; direction: string }) => {
    setSort(data);
    setRows(rows => {
      return rows.sort((a, b) => {
        if ((a.updated_At ? a.updated_At : a.created_At) > (b.updated_At ? b.updated_At : b.created_At))
          return data.direction === 'asc' ? 1 : -1;
        if ((a.updated_At ? a.updated_At : a.created_At) == (b.updated_At ? b.updated_At : b.created_At)) return 0;
        return data.direction === 'asc' ? -1 : 1;
      });
    });
  }, []);

  return (
    <Table stripedRows sort={sort} onSort={onSort} loading={loading}>
      <Table.Header>
        <Table.Column sortableField='date'>{t('common.date')}</Table.Column>
        <Table.Column>{t('dashboard.company')}</Table.Column>
        <Table.Column>{t('common.name')}</Table.Column>
        <Table.Column>E-mail</Table.Column>
        <Table.Column align='right'>{t('common.action')}</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Empty count={rows.length} />
        {rows.map((row, index) => (
          <Table.Row data={row} index={index} key={row.id}>
            <Table.Cell>
              {row.updated_At ? FormataStringData(row.updated_At) : FormataStringData(row.created_At)}
            </Table.Cell>
            <Table.Cell>{row.company.name}</Table.Cell>
            <Table.Cell>{row.user.name}</Table.Cell>
            <Table.Cell>{row.user.email}</Table.Cell>
            <Table.Cell align='right'>
              <Tooltip placement='bottom' title={`${t('user.edit-user')}`}>
                <ButtonIcon
                  onClick={() => {
                    history.push(`/users/edit/${row.id}`);
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
  );
};

export default UserTable;
