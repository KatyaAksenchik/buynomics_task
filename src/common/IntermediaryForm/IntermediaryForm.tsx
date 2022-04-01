import React, { FC } from 'react';

import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { TextFieldController } from '../../component/TextFieldController/TextFieldController';
import { DropdownController } from '../../component/DropdownController/DropdownController';
import { RangeSection } from './components/RangeSection/RangeSection'
import { DropdownSection } from './components/DropdownSection/DropdownSection';


// TODO: move this to constants folder
const TYPE_OPTIONS_KEYS = {
    RANGE: 'range',
    DROPDOWN: 'dropdown',
}

const typeOptions = [
    {
        value: TYPE_OPTIONS_KEYS.RANGE,
        label: "Range"
    },
    {
        value: TYPE_OPTIONS_KEYS.DROPDOWN,
        label: "Dropdown"
    }
]

export interface IntermediaryFormProperties {
    schema: any,
    onSubmit: (reset: () => void) => (props: any) => void,
    initialValues?: any,
    isEditMode?: boolean,
}

export const IntermediaryForm: FC<IntermediaryFormProperties> = props => {
    const {
        onSubmit,
        schema,
        isEditMode = false,
        initialValues = {},
    } = props;
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        setValue,
        getValues,
        reset,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    const typeValue = watch("type");

    return (
        <form onSubmit={handleSubmit(onSubmit(reset))}>
            <Box sx={{ maxWidth: "600px" }}>
                <TextFieldController
                    name="name"
                    label="Name"
                    register={register}
                    error={errors["name"]}
                />
                <TextFieldController
                    name="order"
                    label="Order"
                    register={register}
                    error={errors["order"]}
                />
                <DropdownController
                    name="type"
                    label="Type"
                    register={register}
                    options={typeOptions}
                    error={errors["type"]}
                    disabled={isEditMode}
                />
                {
                    typeValue === TYPE_OPTIONS_KEYS.RANGE
                    && (
                        <RangeSection
                            register={register}
                            errors={errors}
                        />
                    )
                }
                {
                    typeValue === TYPE_OPTIONS_KEYS.DROPDOWN
                    && (
                        <Box sx={{ border: 1, padding: "20px", marginTop: "20px" }}>
                            <DropdownSection
                                register={register}
                                errors={errors}
                                control={control}
                                onAddOption={() => {
                                    const options = getValues('options') || [];
                                    const newOption = getValues('option');

                                    setValue('options', [...options, newOption])
                                    setValue('option.name', null)
                                    setValue('option.value', null)
                                }}
                            />
                        </Box>
                    )
                }
                <Stack spacing={2}>
                    <Button
                        type='submit'
                        variant="outlined"
                        fullWidth
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        component={Link}
                        to="/"
                        fullWidth
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </form>
    )
}