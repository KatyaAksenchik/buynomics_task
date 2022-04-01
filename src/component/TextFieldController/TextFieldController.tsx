import React, { FC } from "react";

import TextField from '@mui/material/TextField';

import {
    RegisterOptions,
    UseFormRegisterReturn,
} from "react-hook-form";

interface TextFieldControllerProperties {
    label?: string,
    name: string,
    fullWidth?: boolean,
    disabled?: boolean,
    register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn,
    error?: any,
}

export const TextFieldController: FC<TextFieldControllerProperties> = props => {
    const {
        label,
        register,
        name,
        fullWidth = true,
        error,
    } = props;

    return (
        <TextField
            id={name}
            label={label}
            fullWidth={fullWidth}
            margin="dense"
            // TODO: need to create possibly additional wrapper that will devide UI and handling of components to work with form 
            {...register(name)}
            error={error ? true : false}
            helperText={error ? error.message : null}
        />
    )
}