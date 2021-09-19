import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Container } from 'reactstrap';
import InputField from '../../components/InputField';
import { updateForm, resetFormData } from '../../slices/form';
import { validateDataPoint } from './validations';
import { formDataSelector } from '../../selectors/formSelector';

const Form = () => {
    const dispatch = useDispatch();
    const { data: formData, totalChanges, errors } = useSelector(formDataSelector);

    const onDataPointChange = useCallback((id, name, type, updatedValue, rest) => {
        const errorMessage = validateDataPoint(rest, type, updatedValue);
        dispatch(updateForm({ id, name, updatedValue, errorMessage }));
    }, []);

    const renderFormFields = useCallback(({ id, name, type, ...rest }) => {
        // @TODO move these to constants
        if (type === 'text' || type === 'number' || type === 'email') {
            return (
                <InputField
                    dataPointProps={{ ...rest, type, name }}
                    onChange={(updatedValue) => onDataPointChange(id, name, type, updatedValue, rest)}
                    errorMessage={errors[name]}
                />
            );
        }
        // @TODO if you have dropdown/switch etc...
        return null;
    }, [errors, onDataPointChange]);

    const isValidForm = useMemo(() => Object.keys(errors).length === 0 && totalChanges > 0, [errors, totalChanges]);

    return (
        <Container>
            {formData.map((eachDataPoint) => {
                return (
                    <Row className="mt-4" key={eachDataPoint.id}>
                        <Col md={{ size: 4, offset: 4 }}>
                            {renderFormFields(eachDataPoint)}
                        </Col>
                    </Row>
                );
            })}
            <Row className="mt-4 offset-sm-6">
                <Button
                    disabled={totalChanges <= 0}
                    color="primary"
                    className="col col-sm-auto"
                    onClick={() => dispatch(resetFormData())}
                >
                    Reset
                </Button>
                <Button
                    disabled={!isValidForm}
                    color="primary"
                    className="col col-sm-auto ms-2"
                >
                    Submit
                </Button>
            </Row>
        </Container>
    );
};

export default React.memo(Form);
