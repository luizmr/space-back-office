import React, { useState } from 'react';
import Table from '@eduzz/houston-ui/Table';

const GivePermissionPanel = () => {
  // const [sort, setSort] = useState(null);
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [rows, setRows] = useState([
    { id: 1, application: 'Vitrine', name: 'Valbl', permissionGroup: 'Colaborador' },
    { id: 2, application: 'Vitrine', name: 'Space', permissionGroup: 'Colaborador' },
    { id: 3, application: 'Vitrine', name: 'SpacePartner', permissionGroup: 'Parceiro' }
  ]);

  return (
    <div className='container-permission-panel'>
      <h1 style={{ textAlign: 'center' }}>Vitrine permissões</h1>
      <Table stripedRows>
        <Table.Header>
          <Table.Column sortableField='id'>Aplicação</Table.Column>
          <Table.Column sortableField='name'>Nome</Table.Column>
          <Table.Column sortableField='email'>Grupo de permissão</Table.Column>
          <Table.Column sortableField='edit' align='center'>
            Editar
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Empty count={rows.length} />
          {rows.map((row, index) => (
            <Table.Row data={row} index={index} key={row.id}>
              <Table.Cell>{row.application}</Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.permissionGroup}</Table.Cell>
              <Table.Cell align='right'>
                <button>Editar permissoes</button>
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
