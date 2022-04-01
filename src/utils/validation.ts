export const isMaxDecimalCount = (value: number | undefined, maxLength: number): boolean => {
    if (!value) {
        return true
    }

    const decimalString = value.toString().split('.')[1];

    return decimalString
        ? maxLength > decimalString.length
        : true;
}

export const isDecimal = (num: number | undefined) => {
    if (!num) {
        return true
    }

    return num % 1 !== 0;
}

export const isDecimalValidation = {
    name: 'isDecimal',
    message: `Should be decimal  number`,
    test: isDecimal,
}

export const maxDecimalsValidation = (maxDecimals: number) => ({
    name: 'maxDecimal',
    message: `Max decimal count ${maxDecimals}`,
    test: (value: number | undefined) => isMaxDecimalCount(value, maxDecimals),
})

