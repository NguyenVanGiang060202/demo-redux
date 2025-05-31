import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllUsers } from '../features/users/usersSlice';
import { useEffect } from 'react';
import { useState } from 'react';



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





export default function DataTable() {

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { page, pageSize } = paginationModel;


  const dispatch = useDispatch();
  const rows = useSelector(selectAllUsers);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const total = useSelector((state) => state.users.total);

  useEffect(() => {
    dispatch(fetchUsers({
      limit: pageSize, skip: page * pageSize, select: 'id,image,firstName,lastName,age,role'
    }));
  }, [dispatch, page, pageSize]);

  
  return (
    <Paper sx={{ height: '100%', width: 'fit-content' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination={true}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={total ?? 0}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        loading={loading}
      />
    </Paper>
  );
}
