import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import classes from './inputField.module.css';

const InputField = ({ dataPointProps, onChange, errorMessage="" }) => {
    const {type, label, name, updatedValue = "", required = false, min = null, max = null } = dataPointProps;
    return (
        <>
            <Label for={name}>{label}{required ? '  *' : ''}</Label>
            <Input
                className="mt-1"
                type={type}
                id={name}
                placeholder={`Enter ${label}`}
                value={updatedValue}
                onChange={(event) => onChange(event.target.value)}
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
