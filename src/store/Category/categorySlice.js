import { createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./categoryAction";

const initialState = {
    isSuccess: false,
    isLoading: false,
    data: null,
    action: null,
    errorMessage: null,
    successMessage: null,
}

export const categorySlice = createSlice({ 
    name: 'category',
    initialState,
    reducers: {
        resetCategoryState: (state) => initialState
    },
    extraReducers: (builder) => {
        // GET CATEGORIES ACTION
        builder
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'get-categories', data: payload.data }
            })
            .addCase(getCategories.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'get-categories' }
            })
            .addCase(getCategories.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'get-categories' }
            })
        
        // CREATE CATEGORY ACTION
        builder
            .addCase(createCategory.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'create-category', data: payload.data }
            })
            .addCase(createCategory.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'create-category' }
            })
            .addCase(createCategory.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'create-category' }
            })
            
        // CREATE CATEGORY ACTION
        builder
            .addCase(updateCategory.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'update-category', data: payload.data }
            })
            .addCase(updateCategory.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'update-category' }
            })
            .addCase(updateCategory.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'update-category' }
            })
        
        // DELETE CATEGORY ACTION
        builder
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'delete-category', successMessage: payload.message, }
            })
            .addCase(deleteCategory.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'delete-category' }
            })
            .addCase(deleteCategory.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'delete-category' }
            })
    }
})

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;