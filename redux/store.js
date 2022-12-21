import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import postsReducer from "./dashboard/postsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
