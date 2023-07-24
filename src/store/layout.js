import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBreakpoint: false,
    isMenuShow: true,
    isMenuExpand: true,
}

export const layoutSlice = createSlice({ 
    name: 'layout',
    initialState,
    reducers: {
        setBreakpoint: (state, action) => void(state.isBreakpoint = action.payload),
        setMenuShow: (state, action) => void(state.isMenuShow = action.payload),
        setMenuExpand: (state, action) => void(state.isMenuExpand = action.payload),
    }
})

export const { setBreakpoint, setMenuShow, setMenuExpand } = layoutSlice.actions;
export default layoutSlice.reducer;