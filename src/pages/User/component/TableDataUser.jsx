import { Button, Paper } from '@mui/material';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllUsers } from '../../../features/users/usersSlice';




const columns = [
    {
        field: 'fullName',
        headerName: 'Customer',
        description: 'This column has a value getter and is not sortable.',
        width: 300,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
    },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 150,
    },


];



export default function TableDataUser() {
    const dispatch = useDispatch();
    const rows = useSelector(selectAllUsers);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);
    const total = useSelector((state) => state.users.total);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    useEffect(() => {
        dispatch(fetchUsers({
            limit: rowsPerPage, skip: page * rowsPerPage, select: 'id,image,firstName,lastName,age,role'
        }));
    }, [dispatch, page, rowsPerPage]);





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: 'fit-content' }}>
            <TableContainer sx={{ height: 'fit-content' }}>
                <Table stickyHeader sx={{ maxHeight: '100%' }} size='small' aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key='checkBox'
                                align='left'
                                style={{ width: '100px' }}
                                sx={{ padding: '0px' }}
                            >
                                <Checkbox />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align='left'
                                    style={{ width: column.width }}
                                    sx={{ padding: '0px' }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                            <TableCell
                                key='checkBox'
                                align='left'
                                style={{ width: '100px' }}
                                sx={{ padding: '0px' }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                                        <TableCell align='left' sx={{ padding: '0px' }}>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell align='left' sx={{ padding: '0px', display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '4px'}}>
                                            <img
                                                src={row.image}
                                                alt="Hình ảnh"
                                                width={50}
                                                height={50}
                                                style={{ objectFit: 'cover', borderRadius: '100%' }}
                                            />
                                            {`${row.firstName || ''} ${row.lastName || ''}`}
                                        </TableCell>
                                        <TableCell align='left' sx={{ padding: '0px' }}>
                                            {row.role === 'admin' ? <div className='bg-red-200 border-red-400 border-2 rounded-full px-2 p-1 w-fit'>{row.role}</div> : <div className='bg-green-200 border-green-400 border-2 rounded-full px-2 p-1 w-fit'>{row.role}</div>}
                                        </TableCell>
                                        <TableCell align='left' sx={{ padding: '0px' }}>
                                            {row.firstName}
                                        </TableCell>
                                        <TableCell align='left' sx={{ padding: '0px' }}>
                                            {row.lastName}
                                        </TableCell>
                                        
                                        
                                        <TableCell align='left' sx={{ padding: '0px' }}>
                                            {row.age}
                                        </TableCell>
                                        <TableCell align='left' sx={{ padding: '0px' }}>
                                            <Button>...</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}

            />
        </Paper>
    )
}
