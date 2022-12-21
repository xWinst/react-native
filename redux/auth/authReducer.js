import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
