import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {  Drawer, Layout } from 'antd'
import Sidebar from 'components/Sidebar'
import { setMenuShow } from 'store/layout'
import Header from 'components/Header'
import { getUserData } from 'utils/userData'
import { resetUserState } from 'store/User/userSlice'
import { getUser } from 'store/User/userAction'
import LoadingOverlay from 'components/LoadingOverlay'

const ProtectedLayout = () => {
    
    const dispatch = useDispatch()        
    const [ userInfo, setUserInfo ] = useState(getUserData())
    const { isSuccess, isLoading, errorMessage, action } = useSelector(state => state.User)
    const { isBreakpoint, isMenuShow } = useSelector(state => state.Layout)
    
    useEffect(() => {
        if (isBreakpoint) dispatch(setMenuShow(false))
        else dispatch(setMenuShow(true))
    }, [isBreakpoint])

    useEffect(() => {
        async function fetchData() { await dispatch(getUser()) }
        fetchData()
        return () => dispatch(resetUserState())
    }, [])

    useEffect(() => {
        if (!isLoading && isSuccess && action === 'get-user') setUserInfo(getUserData())
        if (!isLoading && errorMessage && action === 'get-user') setUserInfo(null)
    }, [isLoading])

    if (errorMessage && action === 'get-user') return ( <Navigate to={'/login'} /> )
    
    if (userInfo) return (
        <Layout style={{ height: '100vh' }}>            
        { isBreakpoint ? 
            <Drawer 
                width={'auto'}
                placement='left' 
                open={isMenuShow} 
                closeIcon={false} 
                closable={false}
                onClose={e => dispatch(setMenuShow(false))}
                bodyStyle={{ padding: 0 }}
            >
                <Sidebar />
            </Drawer>
        : 
            <Sidebar />

        }
            <Layout>
                <Header />
                <Layout.Content className='layout-content'>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    )

    return (
        <LoadingOverlay toggle={true} />
    )
}

export default ProtectedLayout
