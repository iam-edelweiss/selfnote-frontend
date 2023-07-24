import { createSlice } from "@reduxjs/toolkit";
import { changePassword, getUser, removeAccount, updateUser } from "./userAction";
import { deleteUserData, setUserData } from "../../utils/userData";

const initialState = {
    isSuccess: false,
    isLoading: false,
    data: null,
    errorMessage: null,
    action: null
}

export const userSlice = createSlice({ 
    name: 'user',
    initialState,
    reducers: {
        resetUserState: () => initialState
    },
    extraReducers: (builder) => {
        // USER ACTION
        builder
            .addCase(getUser.fulfilled, (state, { payload }) => {
                setUserData(payload.data)
                return { 
                    ...initialState, 
                    isSuccess: true,
                    action: 'get-user'
                }
            })
            .addCase(getUser.pending, (state, { payload }) => {
                return { 
                    ...initialState, 
                    isLoading: true,
                    action: 'get-user'
                }
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                deleteUserData()
                return { 
                    ...initialState, 
                    errorMessage: payload.message ?? "unexpected error",
                    action: 'get-user'
                }
            })   
            
        // USER UPDATE
        builder
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                setUserData(payload.data)
                return { 
                    ...initialState, 
                    isSuccess: true, 
                    data: payload.data, 
                    successMessage: payload.message,
                    action: 'update-user'
                }
            })
            .addCase(updateUser.pending, (state, { payload }) => {
                return { 
                    ...initialState, 
                    isLoading: true,
                    action: 'update-user'
                }
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                return { 
                    ...initialState, 
                    errorMessage: payload.message ?? "unexpected error",
                    action: 'update-user'
                }
            })  

        // USER UPDATE
        builder
            .addCase(changePassword.fulfilled, (state, { payload }) => {
                return { 
                    ...initialState, 
                    isSuccess: true, 
                    data: payload.data, 
                    successMessage: payload.message,
                    action: 'change-password'
                }
            })
            .addCase(changePassword.pending, (state, { payload }) => {
                return { 
                    ...initialState, 
                    isLoading: true,
                    action: 'change-password'
                }
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                return { 
                    ...initialState, 
                    errorMessage: payload.message ?? "unexpected error",
                    action: 'change-password'
                }
            })  

            
        // USER REMOVE
        builder
            .addCase(removeAccount.fulfilled, (state, { payload }) => {
                deleteUserData()
                return { 
                    ...initialState, 
                    isSuccess: true, 
                    data: payload.data, 
                    successMessage: payload.message,
                    action: 'remove-account'
                }
            })
            .addCase(removeAccount.pending, (state, { payload }) => {
                return { 
                    ...initialState, 
                    isLoading: true,
                    action: 'remove-account'
                }
            })
            .addCase(removeAccount.rejected, (state, { payload }) => {
                return { 
                    ...initialState, 
                    errorMessage: payload.message ?? "unexpected error",
                    action: 'remove-account'
                }
            })  
    }
})

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;