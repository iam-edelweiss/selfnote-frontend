import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN, LOGOUT, LOGOUT_ALL, REGISTER, REQUEST_RESET_PASSWORD, RESET_PASSWORD, VERIFY_REGISTRATION } from "../../api/endpoints";
import nonAuthApi from "api/nonAuthApi";
import authApi from "api/authApi";

export const login = createAsyncThunk("authentication/login", async(payload, {rejectWithValue}) => {
    try {          
        await nonAuthApi.post(LOGIN, payload) 
        return {} 
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("authentication/logout", async(payload, {rejectWithValue}) => {
    try {          
        await authApi.get(LOGOUT, payload) 
        return {} 
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const logoutAll = createAsyncThunk("authentication/logout-all", async(payload, {rejectWithValue}) => {
    try {          
        await authApi.get(LOGOUT_ALL, payload) 
        return {} 
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("authentication/register", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.post(REGISTER, payload)
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const verify = createAsyncThunk("authentication/verify", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.get(VERIFY_REGISTRATION+`?token=${payload}`)
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const reqResetPassword = createAsyncThunk("authentication/reset-password/request", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.post(REQUEST_RESET_PASSWORD, payload)
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const resetPassword = createAsyncThunk("authentication/reset-password", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.post(RESET_PASSWORD, payload)
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});