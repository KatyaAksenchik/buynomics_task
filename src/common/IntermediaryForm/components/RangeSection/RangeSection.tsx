import React, { FC } from 'react';

import {
    RegisterOptions,
    UseFormRegisterReturn,
} from "react-hook-form";

import { TextFieldController } from '../../../../component/TextFieldController/TextFieldController';

interface RangeSectionProperties {
    register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn,
    errors: any,
}

export const RangeSection: FC<RangeSectionProperties> = props => {
    const {
        register,
        errors
    } = props;

    return (
        <React.Fragment>
            <TextFieldController
                name="fromRange"
                label="From"
                register={register}
                error={errors["fromRange"]}
            />
            <TextFieldController
                name="toRange"
                label="To"
                register={register}
                error={errors["toRange"]}
            />
            <TextFieldController
                name="step"
                label="Step"
                register={register}
                error={errors["step"]}
            />
        </React.Fragment>
    )
}