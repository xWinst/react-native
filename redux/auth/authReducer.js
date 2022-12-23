import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { updateUser, setError } = authSlice.actions;
export default authSlice.reducer;
