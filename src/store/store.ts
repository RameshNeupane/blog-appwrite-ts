import authReducer from "@store/slice/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@store/slice/postsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
});

export type rootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// custom dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;

// custom selector hook
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;

export default store;
