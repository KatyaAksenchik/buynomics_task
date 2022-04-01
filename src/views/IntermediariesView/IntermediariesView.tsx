import React, { useEffect, useState, FC } from 'react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import { BasicTable } from '../../component/BasicTable/BasicTable';

import { ROUTE_PATH } from '../../constants/routes';
import literals from '../../literals/en.json';
import apiService from '../../service/apiService';
import { numberComparator } from '../../utils/math';
import { Intermediary } from '../../types/Intermediary';

// TODO: create separate helper/service/something where will keep all method for intermediaries mapping
export const getIntermediariesFullName = (intermediary: Intermediary): string => {
    const groupIndent = intermediary.group
        ? `${intermediary.group}:`
        : "";

    return `${groupIndent} ${intermediary.name}`
}

export const getMappedIntermediaries = (intermediaries: Intermediary[]) => (
    intermediaries
        .map((intermediary: Intermediary) => ({
            ...intermediary,
            name: getIntermediariesFullName(intermediary),
            // TODO: possibly date+time values we need to store on BE as UTC, so on FE we need to updated them according to our timezone
            createdAt: new Date(intermediary.createdAt).toString()
        }))
        .sort((a: Intermediary, b: Intermediary) => numberComparator(a.order, b.order))
)

export const IntermediariesView: FC = () => {
    const [intermediaries, setIntermediaries] = useState<Intermediary[]>();

    useEffect(() => {
        setMappedIntermediaries(apiService.loadIntermediaries());
    }, [])

    const setMappedIntermediaries = (updatedIntermediaries: Intermediary[]) => {
        setIntermediaries(getMappedIntermediaries(updatedIntermediaries))
    }

    const onDelete = (id: number) => {
        const updatedIntermediaries = apiService.deleteIntermediary(id);

        setMappedIntermediaries(updatedIntermediaries)
    }

    const renderActionCell = (cellData: any) => {
        const intermediaryId = cellData.row.original.id;

        return (
            <React.Fragment>
                <IconButton
                    aria-label="edit"
                    to={`/intermediary/${intermediaryId}`}
                    component={Link}
                >
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => onDelete(intermediaryId)} >
                    <DeleteIcon />
                </IconButton>
            </React.Fragment>
        )
    }

    const columns = React.useMemo(
        () => ([
            {
                Header: literals['intermediariesView.table.collumn.createdAt'],
                accessor: 'createdAt',
            },
            {
                Header: literals['intermediariesView.table.collumn.name'],
                accessor: 'name',
            },
            {
                Header: literals['intermediariesView.table.collumn.order'],
                accessor: 'order',
            },
            {
                accessor: "action",
                Header: "",
                Cell: renderActionCell,
            }
        ]),
        []
    )

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                >
                    {literals['intermediariesView.heading']}
                </Typography>
                <Button
                    variant="outlined"
                    to={ROUTE_PATH.intermediaryAdd}
                    component={Link}
                >
                    {literals['intermediariesView.addButton']}
                </Button>
            </Box>
            {/* TODO: add hoc for loader component */}
            {
                intermediaries
                && (
                    <BasicTable
                        columns={columns}
                        data={intermediaries}
                    />
                )
            }
        </React.Fragment>
    )
}