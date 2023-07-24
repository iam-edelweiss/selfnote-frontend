import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSidebarConfig from 'assets/hooks/useSidebarConfig';
import logo from 'assets/images/selfnote.png';
import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Layout, Space } from 'antd'
import { getUserData } from 'utils/userData';
import { resetAuthState } from 'store/Authentication/authSlice';
import { logout } from 'store/Authentication/authActions';
import { useToken } from 'antd/es/theme/internal';

const Header = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, action } = useSelector(state => state.Auth)
    const { handleSidebarShow } = useSidebarConfig()
    const userInfo = getUserData()

    useEffect(() => {
        if (isSuccess && action === 'logout') navigate('/login')
        return () => dispatch(resetAuthState())
    }, [isSuccess])

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    const contentStyle = {
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: '1px solid #f9f9f9',
        boxShadow: 'none',
        marginTop: '10px'
    }
    

    return (
        <Layout.Header className='layout-header'>
            <div className="header-left">
                <div className='breakpoint-only'>
                    <MenuOutlined className='me-3' onClick={() => handleSidebarShow()} style={{cursor: 'pointer'}} />   
                    <img src={logo} alt="" height={40} />
                </div>    
            </div>
            <div className="header-right">
                <Dropdown 
                    trigger={'click'}
                    menu={{ 
                        items: [
                            { key:'setting', label: ( <Link className='font-12' to={'/setting'}>Setting</Link> ) },
                            { key:'logout', danger: true, label: ( <a onClick={handleLogout} className='font-12'>Logout</a> ) }
                        ]
                    }} 
                    dropdownRender={(menu) => (
                        <div style={contentStyle}>
                            {/* {React.cloneElement(menu, { style: menuStyle, })} */}
                            <Divider style={{ margin: 0 }} />
                            <p className='mb-0 text-center'>
                                <Button 
                                    size='small' type="primary" danger 
                                    className='font-12 px-3 my-3'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </p>
                        </div>
                    )}  
                >
                    <a onClick={e => e.preventDefault()} className='text-body' style={{ lineHeight: '0.9', textAlign: 'left' }}>
                        <Space direction='horizontal'>
                            <div>
                                <Avatar>{ String(userInfo?.name.toUpperCase()).charAt(0) }</Avatar>
                            </div>
                            <div>
                                <Space>
                                    <div>
                                        <span className='font-12 fw-bold'>{ String(userInfo?.name).replace(/(.{20})..+/, "$1 ...") }</span>
                                        <p className='font-11 mb-0'>{ userInfo?.current_session.identifier }</p>
                                    </div>
                                    <DownOutlined style={{ width: '10px'}} />
                                </Space>
                            </div>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Layout.Header>
    )
}

export default Header
