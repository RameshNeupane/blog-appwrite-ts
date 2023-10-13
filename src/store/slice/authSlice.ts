import authService from "@appwrite/auth";
import { rootState } from "@store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginData, ISignupData, IUserData } from "src/types/auth.types";

interface IInitialState {
    status: "idle" | "loading" | "succeeded" | "failed";
    isUserLoggedIn: boolean;
    userData: IUserData;
    error?: string;
    signupError?: string;
    loginError?: string;
    logoutError?: string;
}

const initialState: IInitialState = {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    isUserLoggedIn: false,
    userData: {},
    error: "",
    signupError: "",
    loginError: "",
    logoutError: "",
};

// signup
export const signup = createAsyncThunk(
    "auth/signup",
    async (data: ISignupData) => {
        const session = await authService.createAccount(data);
        if (session) {
            const response = await authService.getCurrentUser();
            if (response) {
                const { $id, name, email } = response;
                const avatarURL = authService.getAvatarInitials(response.name);
                return { $id, name, email, avatarURL };
            }
        }
    }
);

// login
export const login = createAsyncThunk(
    "auth/login",
    async (data: ILoginData): Promise<IUserData | undefined> => {
        const session = await authService.login(data);
        if (session) {
            const response = await authService.getCurrentUser();
            if (response) {
                const { $id, name, email } = response;
                const avatarURL = authService.getAvatarInitials(response.name);
                return { $id, name, email, avatarURL };
            }
        }
    }
);

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

// current user
export const currentUser = createAsyncThunk("auth/currentUser", async () => {
    const response = await authService.getCurrentUser();
    if (response) {
        const { $id, name, email } = response;
        const avatarURL = authService.getAvatarInitials(response.name);
        return { $id, name, email, avatarURL };
    }
});

// auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetSignupError: (state) => {
            state.signupError = "";
        },
        resetLoginError: (state) => {
            state.loginError = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.signupError = "";
                state.isUserLoggedIn = true;
                state.userData = { ...action.payload };
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.isUserLoggedIn = false;
                state.userData = {};
                state.signupError = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loginError = "";
                state.isUserLoggedIn = true;
                state.userData = { ...action.payload };
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.isUserLoggedIn = false;
                state.userData = {};
                state.loginError = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "succeeded";
                state.logoutError = "";
                state.userData = {};
                state.isUserLoggedIn = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.logoutError = action.error.message;
            })
            .addCase(currentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.isUserLoggedIn = true;
                state.userData = { ...action.payload };
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getAuthStatus = (state: rootState) => state.auth.status;
export const getIsUserLoggedIn = (state: rootState) =>
    state.auth.isUserLoggedIn;
export const getUserData = (state: rootState) => state.auth.userData;
export const getAuthError = (state: rootState) => state.auth.error;
export const getSignupError = (state: rootState) => state.auth.signupError;
export const getLoginError = (state: rootState) => state.auth.loginError;
export const getLogoutError = (state: rootState) => state.auth.logoutError;

export const { resetLoginError, resetSignupError } = authSlice.actions;

export default authSlice.reducer;
