import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_CATEGORIES, GET_CATEGORIES, UPDATE_CATEGORIES } from "../../api/endpoints";
import authApi from "../../api/authApi";
import { delay } from "utils/others";

export const getCategories = createAsyncThunk("category", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.get(GET_CATEGORIES) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const createCategory = createAsyncThunk("category/create", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.post(CREATE_CATEGORIES, payload) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const updateCategory = createAsyncThunk("category/update", async({id, data}, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.patch(UPDATE_CATEGORIES+`/${id}`, data) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const deleteCategory = createAsyncThunk("category/delete", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.delete(CREATE_CATEGORIES+`/${payload}`) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});
