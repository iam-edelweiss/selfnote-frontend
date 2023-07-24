import { createSlice } from "@reduxjs/toolkit";
import { login, logout, logoutAll, register, reqResetPassword, resetPassword, verify } from "./authActions";
import { deleteUserData } from "utils/userData";

const initialState = {
    isSuccess: false,
    isLoading: false,
    action: null,
    data: null,
    successMessage: null,
    errorMessage: null,
    errorDetail: null
}

export const authSlice = createSlice({ 
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: () => initialState
    },
    extraReducers: (builder) => {
        // LOGIN ACTION
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                return { ...initialState, action: 'login', isSuccess: true }
            })
            .addCase(login.pending, (state, { payload }) => {
                return { ...initialState, action: 'login', isLoading: true }
            })
            .addCase(login.rejected, (state, { payload }) => {
                return { ...initialState, action: 'login', errorMessage: payload.message ?? "unexpected error" }
            })   
        
        // LOGOUT ACTION
        builder
            .addCase(logout.fulfilled, (state, { payload }) => {
                deleteUserData()
                return { ...initialState, action: 'logout', isSuccess: true }
            })
            .addCase(logout.pending, (state, { payload }) => {
                return { ...initialState, action: 'logout', isLoading: true }
            })
            .addCase(logout.rejected, (state, { payload }) => {
                return { ...initialState, action: 'logout', errorMessage: payload.message ?? "unexpected error" }
            })   
        
        // LOGOUT ALL ACTION
        builder
            .addCase(logoutAll.fulfilled, (state, { payload }) => {
                deleteUserData()
                return { ...initialState, action: 'logout-all', isSuccess: true }
            })
            .addCase(logoutAll.pending, (state, { payload }) => {
                return { ...initialState, action: 'logout-all', isLoading: true }
            })
            .addCase(logoutAll.rejected, (state, { payload }) => {
                return { ...initialState, action: 'logout-all', errorMessage: payload.message ?? "unexpected error" }
            })   
            
        // REGISTER ACTION
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                return { ...initialState, action: 'register', isSuccess: true, successMessage: payload.message }
            })
            .addCase(register.pending, (state, { payload }) => {
                return { ...initialState, action: 'register', isLoading: true }
            })
            .addCase(register.rejected, (state, { payload }) => {
                return { ...initialState, action: 'register', errorMessage: payload.message ?? "unexpected error" }
            })  
        
        // REGISTER ACTION
        builder
            .addCase(verify.fulfilled, (state, { payload }) => {
                return { ...initialState, action: 'verify', isSuccess: true, data: payload.data ?? null, successMessage: payload.message }
            })
            .addCase(verify.pending, (state, { payload }) => {
                return { ...initialState, action: 'verify', isLoading: true }
            })
            .addCase(verify.rejected, (state, { payload }) => {
                return { ...initialState, action: 'verify', errorMessage: payload.message ?? "unexpected error" }
            })  
        
        // REQUEST RESET PASSWORD ACTION
        builder
            .addCase(reqResetPassword.fulfilled, (state, { payload }) => {
                return { ...initialState, action: 'request-reset', isSuccess: true, data: payload.data, successMessage: payload.message }
            })
            .addCase(reqResetPassword.pending, (state, { payload }) => {
                return { ...initialState, action: 'request-reset', isLoading: true }
            })
            .addCase(reqResetPassword.rejected, (state, { payload }) => {
                return { ...initialState, action: 'request-reset', errorMessage: payload.message ?? "unexpected error", errorDetail: payload.detail }
            })  
        
        // RESET PASSWORD ACTION
        builder
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                return { ...initialState, action: 'reset-password', isSuccess: true, data: payload.data, successMessage: payload.message }
            })
            .addCase(resetPassword.pending, (state, { payload }) => {
                return { ...initialState, action: 'reset-password', isLoading: true }
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                return { ...initialState, action: 'reset-password', errorMessage: payload.message ?? "unexpected error", errorDetail: payload.detail }
            })  
    }
})

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;