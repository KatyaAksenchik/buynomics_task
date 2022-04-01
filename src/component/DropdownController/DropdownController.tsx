import React, { FC } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
    RegisterOptions,
    UseFormRegisterReturn,
} from "react-hook-form";

interface DropdownOption {
    label: string,
    value: string,
}

interface DropdownControllerProperties {
    label?: string,
    name: string,
    fullWidth?: boolean,
    disabled?: boolean,
    options: DropdownOption[],
    register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn,
    error?: any,
}

export const DropdownController: FC<DropdownControllerProperties> = props => {
    const {
        label,
        register,
        name,
        fullWidth = true,
        options,
        disabled = false,
    } = props;

    return (
        <FormControl
            fullWidth={fullWidth}
            margin="dense"
        >
            <InputLabel id={name}>
                {label}
            </InputLabel>
            <Select
                labelId={name}
                disabled={disabled}
                id={name}
                label={label}
                fullWidth={fullWidth}
                margin="dense"
                {...register(name)}
            >
                {
                    options.map((option: any) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}