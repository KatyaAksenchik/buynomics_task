import React, { useEffect, useState } from 'react';

import * as yup from "yup";

import { Placeholder } from '../../component/Placeholder/Placeholder';
import { IntermediaryForm } from '../../common/IntermediaryForm/IntermediaryForm';

import apiService from '../../service/apiService';
import { IntermediaryFull } from '../../types/Intermediary';

import {
    isDecimalValidation,
    maxDecimalsValidation,
} from '../../utils/validation';

const getsIntermediaryEditSchema = (stepValue: number | undefined) => yup.object({
    name: yup.string().max(255).required(),
    order: yup.number().integer().required(),
    toRange: yup.number().test(isDecimalValidation).test(maxDecimalsValidation(6)),
    fromRange: yup.number().test(isDecimalValidation)
        .test(maxDecimalsValidation(6))
        .when('toRange', (toRange, schema) => schema.max(toRange))
        .test({
            name: 'isMultiple',
            message: `Should be multiple to step`,
            test: function (value: number | undefined) {
                const { step } = this.parent;
                if (!value || !step) {
                    return true;
                }

                return Number.isInteger(Number((value / step).toFixed(6)));
            }
        }),
    step: yup.number().positive().test(isDecimalValidation).test(maxDecimalsValidation(6)).max(stepValue || 0),
    option: yup.object({
        value: yup.number().test(isDecimalValidation).test(maxDecimalsValidation(6)),
    })
});

export const IntermediaryEditView = () => {
    const [intermediary, setIntermediary] = useState<IntermediaryFull>();

    const intermediaryId = parseInt(window.location.pathname.split('/')[2]);
    console.log("intermediaryId", intermediaryId);
    useEffect(() => {
        setIntermediary(apiService.getIntermediaryById(intermediaryId))
    }, [intermediaryId])

    const onSubmit = (reset: () => void) => (intermediary: any) => {
        const {
            option,
            ...intermediaryRequestData
        } = intermediary
        apiService.updateIntermediary(intermediaryId, intermediaryRequestData);
        setIntermediary({
            ...intermediary,
            intermediary
        })
    }

    return intermediary?.id
        ? (
            <IntermediaryForm
                isEditMode
                onSubmit={onSubmit}
                schema={getsIntermediaryEditSchema(intermediary?.step)}
                initialValues={intermediary}
            />
        )
        : <Placeholder text="Such intermediary doesn't exist" />
}