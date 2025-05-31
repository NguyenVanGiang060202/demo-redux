import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetAllUserQuery } from '../services/userApi';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../features/users/usersSlice';



const columns = [
  {
    field: 'id', headerName: 'ID', width: 70,

  },
  {
    field: 'image',
    headerName: 'Hình ảnh',
    width: 100,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Hình ảnh"
        width={50}
        height={50}
        style={{ objectFit: 'cover', borderRadius: '100%' }}
      />
    ),
  },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 130,
  }
];


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const { isLoading, isError } = useGetAllUserQuery({ skip: 0, limit: 20, select: 'id,firstName,lastName,image,age,role' });
  const rows = useSelector(selectAllUsers);
  console.log(rows)
  return (
    <Paper sx={{ height: '100%', width: 'fit-content' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
