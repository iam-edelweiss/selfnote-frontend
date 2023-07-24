import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHANGE_PASSWORD, REMOVE_ACCOUNT, USER, USER_UPDATE } from "../../api/endpoints";
import authApi from "../../api/authApi";
import { delay } from "../../utils/others";

export const getUser = createAsyncThunk("user/profile", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.get(USER, payload) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk("user/update", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.patch(USER_UPDATE, payload) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const changePassword = createAsyncThunk("user/change-password", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.patch(CHANGE_PASSWORD, payload) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const removeAccount = createAsyncThunk("user/remove-account", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.delete(REMOVE_ACCOUNT, {data: payload}) // only for delete Method
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});