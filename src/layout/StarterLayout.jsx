import { LeftOutlined, MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Drawer, Layout } from 'antd'
import Sidebar from 'components/Sidebar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setMenuExpand, setMenuShow } from 'store/layout'
import demoLogo from 'assets/images/demo.png';
import useSidebarConfig from 'assets/hooks/useSidebarConfig'

const StarterLayout = () => {
    
    const dispatch = useDispatch()
    const { handleSidebarShow } = useSidebarConfig()
    const { isBreakpoint, isMenuShow } = useSelector(state => state.Layout)
    
    useEffect(() => {
        if (isBreakpoint) dispatch(setMenuShow(false))
        else dispatch(setMenuShow(true))
    }, [isBreakpoint])

    
    return (
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
                <Layout.Header className='layout-header'>
                    <div className="header-left">
                        <div className='breakpoint-only'>
                            <MenuOutlined className='me-2' onClick={() => handleSidebarShow()} style={{cursor: 'pointer'}} />   
                            <img src={demoLogo} alt="" height={40} />
                        </div>    
                    </div>
                    <div className="header-right">
                        right
                    </div>
                </Layout.Header>
                <Layout.Content className='layout-content'>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default StarterLayout
