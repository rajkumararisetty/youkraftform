import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import classes from './inputField.module.css';

const InputField = ({ dataPointProps, onChange, errorMessage = "" }) => {
    const { type, label, name, updatedValue = "", required = false, min = null, max = null } = dataPointProps;

    const inputRef = useRef();
    const timeoutId = useRef(null);

    useEffect(() => {
        inputRef.current.value = updatedValue;
    }, [updatedValue]);

    const debounce = useCallback((callback, time) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(callback, time);
    }, []);

    const onTextChange = useCallback((event) => debounce(() => onChange(event.target.value), 300), [debounce]);

    const inputType = useMemo(() => {
        if (type === 'number') {
            return 'number';
        }
        if (type === 'email') {
            return 'email';
        }
        return 'text';
    }, [type]);

    return (
        <>
            <Label for={name}>{label}{required ? '  *' : ''}</Label>
            <Input
                className="mt-1"
                innerRef={inputRef}
                type={inputType}
                id={name}
                placeholder={`Enter ${label}`}
                onChange={onTextChange}
                min={min}
                max={max}
                autoComplete="nil"
                invalid={!!errorMessage}
            />
            <div className={classes.errorMessage}>{errorMessage}</div>
        </>
    );
};

InputField.propTypes = {
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    dataPointProps: PropTypes.shape({
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        updatedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        required: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
    }).isRequired,
}

export default React.memo(InputField);
