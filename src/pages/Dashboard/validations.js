export const validateDataPoint = (dataPoint, type, updatedValue) => {
    if (dataPoint.value === updatedValue) {
        return '';
    }

    if (dataPoint.required && updatedValue === '') {
        return `Must have ${dataPoint.label}`;
    }

    const isNumber = type === 'number';
    const updatedValueLength = isNumber ? updatedValue : updatedValue.length;
    if (dataPoint.min) {
        if (updatedValueLength < dataPoint.min) {
            return isNumber ? `Must be greater than ${dataPoint.min}` : `Must have enter more than ${dataPoint.min} characters`;
        }
    }

    if (dataPoint.max) {
        if (updatedValueLength > dataPoint.max) {
            return isNumber ? `Must be less than ${dataPoint.max}` : `Must have enter less than ${dataPoint.max} characters`;
        }
    }

    return '';
};
