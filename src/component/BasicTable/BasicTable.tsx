import React, { FC } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useTable } from 'react-table';

// TODO: add pagable component and ability to load data by pages
// TODO: set up correct types 

interface BasicTableProperties {
    columns: any,
    data: any,
}

export const BasicTable: FC<BasicTableProperties> = (props: any) => {
    const {
        columns,
        data,
    } = props;

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return (
        <TableContainer component={Paper}>
            <Table {...getTableProps()}>
                <TableHead>
                    {
                        headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <TableCell {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, i: number) => {
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <TableCell {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}