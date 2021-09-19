import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    totalChanges: 0,
    errors: {},
    data: [
        {
            id: 1,
            type: 'text',
            required: true,
            name: "firstName",
            label: "First Name",
            value: "Rajkumar",
            updatedValue: "Rajkumar",
            min: 3,
            max: 10,
        },
        {
            id: 2,
            type: 'text',
            required: true,
            name: "lastName",
            label: "Last Name",
            value: "Arisetty",
            updatedValue: "Arisetty",
            min: 3,
            max: 10,
        },
        {
            id: 3,
            type: 'text',
            required: false,
            name: "middleName",
            label: "Middle Name",
            value: "",
            updatedValue: "",
            min: null,
            max: 10,
        },
        {
            id: 4,
            type: 'number',
            required: true,
            label: "Age",
            name: "age",
            value: 28,
            updatedValue: 28,
            min: 1,
            max: 60,
        }
    ],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateForm: (state, { payload }) => {
            const { id, name, updatedValue, errorMessage } = payload;

            const index = state.data.findIndex((dataPoint) => dataPoint.id === id);

            const value = state.data[index].value;
            if (value === state.data[index].updatedValue && value !== updatedValue) {
                state.totalChanges++;
            } else if (value === updatedValue) {
                state.totalChanges--;
            }

            if (errorMessage) {
                state.errors[name] = errorMessage;
            } else {
                delete state.errors[name];
            }

            state.data[index].updatedValue = updatedValue;
        },
        resetFormData: (state) => {
            state.data = initialState.data;
            state.totalChanges = initialState.totalChanges;
            state.errors = initialState.errors;
        }
    },
});

export const { updateForm, resetFormData } = formSlice.actions;

export default formSlice.reducer;
