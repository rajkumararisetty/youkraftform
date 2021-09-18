import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    errors: false,
    data: {},
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateForm: (state, { payload }) => {
            state.data = {};
        }
    },
});

export const { updateForm } = formSlice.actions;

export const formDataSelector = state => {
    return state.form.data;
};

export default formSlice.reducer;
