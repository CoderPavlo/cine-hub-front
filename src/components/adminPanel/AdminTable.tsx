import { GetRequest, PaginationProps } from '../../models/api'
import { Edit, Delete, Update } from '@mui/icons-material';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack, Tooltip, IconButton, Skeleton, Typography, TablePagination } from '@mui/material';
import LoadingComponent from '../common/LoadingComponent';

interface AdminTableProps<T> {
    data?: GetRequest<T>,
    columns: string[],
    filter: PaginationProps,
    onFilterChange: (name: keyof PaginationProps, value: PaginationProps[typeof name]) => void,
    values: (item: T) => (string|number)[],
    editOnClick: (item: T) => void,
    deleteOnClick: (item: T) => void,
    loading: boolean,
    error: boolean,
    refetch: () => void,
}

const AdminTable = <T extends Record<string, any>>({ data, columns, filter, onFilterChange, values, editOnClick, deleteOnClick, loading, error, refetch }: AdminTableProps<T>) => {
    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(key =>
                                <TableCell key={key}>{key}</TableCell>
                            )}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <LoadingComponent loading={loading} error={error}
                            skeleton={[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    {columns.map(item =>
                                        <TableCell key={item}><Skeleton variant="text" width={item === 'Id' ? 40 : 100} /></TableCell>
                                    )}
                                    <TableCell>
                                        <Stack direction='row' spacing={1}>
                                            <Skeleton variant="circular" width={34} height={34} />
                                            <Skeleton variant="circular" width={34} height={34} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            errorComponent={
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1}>
                                        <Typography variant='h5' color='error' textAlign='center'>
                                            An error occurred while loading
                                            <IconButton sx={{ marginLeft: 1 }} onClick={refetch}>
                                                <Update />
                                            </IconButton>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            }
                        >
                            {data && data.results.map((item, index) => (
                                <TableRow key={index}>
                                    {values(item).map((key)=><TableCell key={key}>{key}</TableCell>)}
                                    <TableCell>
                                        <Stack direction='row' spacing={1}>
                                            <Tooltip title="Edit">
                                                <IconButton color="primary" size="small" onClick={() => editOnClick(item)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton color="error" size="small" onClick={() => deleteOnClick(item)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </LoadingComponent>
                    </TableBody>
                </Table>
            </TableContainer>
            {data &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.total_results}
                    rowsPerPage={filter.itemsPerPage}
                    page={filter.page-1}
                    onPageChange={(e, page) => onFilterChange('page', page+1)}
                    onRowsPerPageChange={(e) => onFilterChange('itemsPerPage', +e.target.value)}
                />
            }
        </Paper>
    )
}

export default AdminTable