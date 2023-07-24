import { createSlice } from "@reduxjs/toolkit";
import { createTableNote, createTextNote, deleteDataFromTable, deleteTableNote, deleteTextNote, getNoteStatistic, getTableNote, getTables, getTextNote, getTextNotes, insertToTable, updateDataFromTable, updateTextNote } from "./noteAction";

const initialState = {
    isSuccess: false,
    isLoading: false,
    data: null,
    action: null,
    errorMessage: null,
    successMessage: null,
}

export const noteSlice = createSlice({ 
    name: 'note',
    initialState,
    reducers: {
        resetNoteState: (state) => initialState
    },
    extraReducers: (builder) => {
        // GET NOTELIST ACTION
        builder
            .addCase(getTextNotes.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'get-textnotes', data: payload.data }
            })
            .addCase(getTextNotes.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'get-textnotes' }
            })
            .addCase(getTextNotes.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'get-textnotes' }
            })
        
        // GET TEXTNOTE ACTION
        builder
            .addCase(getTextNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'get-textnote', data: payload.data }
            })
            .addCase(getTextNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'get-textnote' }
            })
            .addCase(getTextNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'get-textnote' }
            })
        
        // CREATE TEXT NOTE
        builder
            .addCase(createTextNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'create-textnote' }
            })
            .addCase(createTextNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'create-textnote' }
            })
            .addCase(createTextNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'create-textnote' }
            })           
            
        // UPDATE TEXT NOTE
        builder
            .addCase(updateTextNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, action: 'update-textnote' }
            })
            .addCase(updateTextNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'update-textnote' }
            })
            .addCase(updateTextNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'update-textnote' }
            }) 
        
        // DELETE TEXT NOTE
        builder
            .addCase(deleteTextNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, successMessage: payload.message, action: 'delete-textnote' }
            })
            .addCase(deleteTextNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'delete-textnote' }
            })
            .addCase(deleteTextNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'delete-textnote' }
            }) 

    // TABLENOTE
    
        builder
            .addCase(getTables.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'get-tables' }
            })
            .addCase(getTables.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'get-tables' }
            })
            .addCase(getTables.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'get-tables' }
            }) 

        builder
            .addCase(getTableNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'get-table' }
            })
            .addCase(getTableNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'get-table' }
            })
            .addCase(getTableNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'get-table' }
            }) 

        builder
            .addCase(createTableNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'create-table' }
            })
            .addCase(createTableNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'create-table' }
            })
            .addCase(createTableNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'create-table' }
            }) 
            
        builder
            .addCase(deleteTableNote.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'delete-table' }
            })
            .addCase(deleteTableNote.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'delete-table' }
            })
            .addCase(deleteTableNote.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'delete-table' }
            }) 

        // ROW
        builder
            .addCase(insertToTable.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'insert-to-table' }
            })
            .addCase(insertToTable.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'insert-to-table' }
            })
            .addCase(insertToTable.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'insert-to-table' }
            })         
            
        builder
            .addCase(deleteDataFromTable.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'delete-row' }
            })
            .addCase(deleteDataFromTable.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'delete-row' }
            })
            .addCase(deleteDataFromTable.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'delete-row' }
            }) 
            
        builder
            .addCase(updateDataFromTable.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'update-row' }
            })
            .addCase(updateDataFromTable.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'update-row' }
            })
            .addCase(updateDataFromTable.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'update-row' }
            }) 

        builder
            .addCase(getNoteStatistic.fulfilled, (state, { payload }) => {
                return { ...initialState, isSuccess: true, data: payload.data, successMessage: payload.message, action: 'get-statistic' }
            })
            .addCase(getNoteStatistic.pending, (state, { payload }) => {
                return { ...initialState, isLoading: true, action: 'get-statistic' }
            })
            .addCase(getNoteStatistic.rejected, (state, { payload }) => {
                return { ...initialState, errorMessage: payload.message ?? "unexpected error", action: 'get-statistic' }
            }) 

    }
})

export const { resetNoteState } = noteSlice.actions;
export default noteSlice.reducer;