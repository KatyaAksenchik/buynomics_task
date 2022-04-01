import React from 'react';

import * as yup from "yup";

import { IntermediaryForm } from '../../common/IntermediaryForm/IntermediaryForm';

import apiService from '../../service/apiService';
import {
    isDecimalValidation,
    maxDecimalsValidation,
} from '../../utils/validation';

const schema = yup.object({
    name: yup.string().max(255).required(),
    order: yup.number().integer().required(),
    toRange: yup.number().test(isDecimalValidation).test(maxDecimalsValidation(6)),
    fromRange: yup.number().test(isDecimalValidation).test(maxDecimalsValidation(6)).when('toRange', (toRange, schema) => schema.max(toRange)),
    step: yup.number().positive().test(isDecimalValidation).test(maxDecimalsValidation(6)),
    option: yup.object({
        value: yup.number().test(isDecimalValidation).test(maxDecimalsValidation(6)),
    })
});

export const IntermediaryAddView = () => {
    const onSubmit = (reset: () => void) => (intermediary: any) => {
        const {
            option,
            ...intermediaryRequestData
        } = intermediary
        apiService.addIntermediary(intermediaryRequestData);
        reset();
    }

    return (
        <IntermediaryForm
            onSubmit={onSubmit}
            schema={schema}
        />
    )
}