import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuExpand, setMenuShow } from 'store/layout'

const sidebarStyles = {
    width: '220px',
    widthOnCollapsed: '70px',
    headerHeight: '50px',
}

const useSidebarConfig = () => {

    const dispatch = useDispatch()
    const { isBreakpoint, isMenuShow, isMenuExpand } = useSelector(state => state.Layout)

    const handleSidebarShow = () => {
        if (isBreakpoint) {
            dispatch(setMenuExpand(true))
            dispatch(setMenuShow(!isMenuShow))
        } else {
            dispatch(setMenuShow(!isMenuShow))
        }
    }
    
    const handleExpand = () => {
        if (isBreakpoint) {
            dispatch(setMenuExpand(true))
            dispatch(setMenuShow(!isMenuShow))
        } else {            
            dispatch(setMenuExpand(!isMenuExpand))
        }
    }

    return {
        handleSidebarShow, 
        handleExpand,
        setExpand: (bool) => dispatch(setMenuExpand(bool)),
        styles: sidebarStyles
    }
}

export default useSidebarConfig
