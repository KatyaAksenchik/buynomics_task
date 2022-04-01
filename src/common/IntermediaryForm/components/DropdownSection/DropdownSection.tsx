import React, { FC } from 'react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {
    Controller,
    RegisterOptions,
    UseFormRegisterReturn,
    Control
} from "react-hook-form";

import { TextFieldController } from '../../../../component/TextFieldController/TextFieldController';
import { BasicTable } from '../../../../component/BasicTable/BasicTable';

import literals from '../../../../literals/en.json';

interface DropdownSectionProperties {
    onAddOption: () => void,
    register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn,
    control: Control<any>,
    errors: any,
}

export const DropdownSection: FC<DropdownSectionProperties> = props => {
    const {
        register,
        control,
        errors,
        onAddOption,
    } = props;

    const renderActionCell = (cellData: any) => (
        <React.Fragment>
            <IconButton aria-label="edit" onClick={() => { }} >
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => { }} >
                <DeleteIcon />
            </IconButton>
        </React.Fragment>
    )

    const columns = React.useMemo(
        () => ([
            {
                Header: literals['intermediaryForm.option.field'],
                accessor: 'name',
            },
            {
                Header: literals['intermediaryForm.value.field'],
                accessor: 'value',
            },
            {
                accessor: "action",
                Header: "",
                Cell: renderActionCell,
            }
        ]),
        []
    );

    return (
        <React.Fragment>
            <TextFieldController
                name="option.name"
                label="Option"
                register={register}
            />
            <TextFieldController
                name="option.value"
                label="Value"
                register={register}
                error={errors?.option?.value}
            />
            <Button
                variant="outlined"
                onClick={onAddOption}
            >
                Add option
            </Button>

            <Controller
                control={control}
                name="options"
                render={({ field: { value } }) => {
                    return value && value.length ?
                        <BasicTable
                            columns={columns}
                            data={value}
                        />
                        : <div />
                }}
            />
        </React.Fragment>
    )
}