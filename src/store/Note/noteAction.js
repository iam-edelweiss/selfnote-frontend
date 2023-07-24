import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_TABLENOTES, CREATE_TEXTNOTES, DELETE_ROW, DELETE_TABLENOTES, DELETE_TEXTNOTES, GET_TABLENOTE, GET_TABLENOTES, GET_TEXTNOTE, GET_TEXTNOTES, INSERT_TO_TABLE, NOTE_STATISTIC, UPDATE_ROW, UPDATE_TEXTNOTES } from "../../api/endpoints";
import authApi from "../../api/authApi";
import { delay } from "../../utils/others";

export const getTextNotes = createAsyncThunk("note/text/list", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.get(GET_TEXTNOTES+"?"+new URLSearchParams(payload).toString()) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const getTextNote = createAsyncThunk("note/text/detail", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.get(GET_TEXTNOTE+`/${payload}`) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const createTextNote = createAsyncThunk("note/text/create", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.post(CREATE_TEXTNOTES, payload) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const updateTextNote = createAsyncThunk("note/text/update", async({id, data}, {rejectWithValue}) => {
    try {          
        const response = await authApi.patch(UPDATE_TEXTNOTES+`/${id}`, data) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const deleteTextNote = createAsyncThunk("note/text/delete", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.delete(DELETE_TEXTNOTES+`/${payload}`) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

// TABLENOTE

export const getTables = createAsyncThunk("note/table/list", async(payload, {rejectWithValue}) => {
    try {          
        await delay(500)
        const response = await authApi.get(GET_TABLENOTES+"?"+new URLSearchParams(payload).toString()) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const getTableNote = createAsyncThunk("note/table/detail", async({id, query}, {rejectWithValue}) => {
    try {   
        await delay(500)       
        const queryParam = `${query ? "?"+new URLSearchParams(query).toString() : "" }`
        const response = await authApi.get(GET_TABLENOTE+`/${id}`+queryParam) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});


export const createTableNote = createAsyncThunk("note/table/create", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.post(CREATE_TABLENOTES, payload) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const deleteTableNote = createAsyncThunk("note/table/delete", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.delete(DELETE_TABLENOTES+`/${payload}`) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

// ROW

export const insertToTable = createAsyncThunk("note/table/insert", async({id, data}, {rejectWithValue}) => {
    try {          
        const response = await authApi.post(INSERT_TO_TABLE+`/${id}`, data) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const deleteDataFromTable = createAsyncThunk("note/table/row/delete", async({tableId, rowId}, {rejectWithValue}) => {
    try {          
        const response = await authApi.delete(DELETE_ROW+`/${tableId}/${rowId}`) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const updateDataFromTable = createAsyncThunk("note/table/row/update", async({tableId, rowId, data}, {rejectWithValue}) => {
    try {          
        const response = await authApi.patch(UPDATE_ROW+`/${tableId}/${rowId}`, data) 
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});

export const getNoteStatistic = createAsyncThunk("note/statistic", async(payload, {rejectWithValue}) => {
    try {          
        const response = await authApi.get(NOTE_STATISTIC)
        return { data: response.data.data, message: response.data.message ?? null }
    } catch (error) {
        if (!error.response) return error;
        return rejectWithValue(error.response.data);
    }
});