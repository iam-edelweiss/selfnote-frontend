import { Button, Layout, Menu } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setMenuShow } from 'store/layout';
import { FileOutlined, FolderOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import logo from 'assets/images/selfnote.png';
import useSidebarConfig from 'assets/hooks/useSidebarConfig';

const Sidebar = () => {
        
    const dispatch = useDispatch()
    const { handleExpand, styles } = useSidebarConfig()
    const { pathname } = useLocation()
    const [ activeKey, setActiveKey ] = React.useState(pathname);
    const [ openKeys, setOpenKeys ] = React.useState([]);

    const { isBreakpoint, isMenuExpand } = useSelector(state => state.Layout)

    useEffect(() => {
        let menus = document.querySelectorAll(`.ant-menu-item`)
        Object.values(menus).forEach(menu => {
            menu.addEventListener('click', function() {
                if (isBreakpoint) dispatch(setMenuShow(false))
            })
        })
    }, [])
    
    useEffect(() => {
        if (pathname === '/') return;
        setActiveKey(pathname)
        handleActiveMenu()
    }, [pathname])

    const handleActiveMenu = () => {        
        const activeMenu = searchActiveMenu(menus)
        if (activeMenu) {
            const isSubmenu = activeMenu.parentKey
            if (isSubmenu) setOpenKeys([activeMenu.parentKey])
            else setOpenKeys([])
        }
    }

    const searchActiveMenu = (items) => {        
        var isBreak = false

        function recursion(items, parentItem = null) {
            var result = null        
            for(var i=0; i< items.length; i++) {
                if (items[i].key === pathname) {  
                    isBreak = true
                    result = {
                        parentKey: parentItem ? parentItem.key ?? null : null,
                        menuKey: items[i].key
                    }
                    break;
                }
    
                if (items[i].children) {
                    if (isBreak) break
                    result = recursion(items[i].children, items[i])
                }
            }
            return result
        }

        return recursion(items)
    }

    const menus = [
        { type: 'group', label: isMenuExpand && 'MENU', children: [
            { key: '/dashboard', icon: <HomeOutlined />, label: <Link to={'/dashboard'}>Dashboard</Link> },
            { key: '/categories', icon: <FolderOutlined />, label: <Link to={'/categories'}>Categories</Link> },
            { key: '/notes', icon: <FileOutlined />, label: 'Notes', children: [
                { key: '/notes/text', label: <Link to={'/notes/text'}>Text</Link> },
                { key: '/notes/table', label: <Link to={'/notes/table'}>Table</Link> },
              ]
            },
            { key: '/setting', icon: <SettingOutlined />, label: <Link to={'/setting'}>Setting</Link> },
        ]}
    ]

    return (
        <Layout.Sider 
            id='sidemenu'
            className='sidemenu' 
            theme='light' 
            trigger={null} 
            collapsible collapsed={!isMenuExpand}
            collapsedWidth={styles.widthOnCollapsed}
            width={styles.width} 
        >
            <Button 
                id='toggle-expand' className='hidden-on-breakpoint'
                type='primary' shape='circle' size='small'
                onClick={() => handleExpand()}
            >
            {isMenuExpand ? '<' : '>'}
            </Button>
            <div className='sidemenu-header'>
                <img src={logo} alt="" />
            </div>
            <Menu
                theme="light"
                mode="inline"
                inlineIndent={0} // paddingLeft
                // inlineCollapsed={isMenuExpand}
                forceSubMenuRender
                selectedKeys={activeKey}
                openKeys={openKeys}
                defaultOpenKeys={openKeys}
                onOpenChange={keys => setOpenKeys(keys)}
                items={menus}
            />
        </Layout.Sider>

        // <Layout.Sider className='sidemenu' theme='light' trigger={null} collapsible collapsed={!isMenuExpand} width={220}>
        //     <Menu 
        //         theme="light"
        //         mode="inline"
        //         // inlineCollapsed={isMenuExpand}
        //         forceSubMenuRender
        //         selectedKeys={activeKey}
        //         openKeys={openKeys}
        //         defaultOpenKeys={openKeys}
        //         onOpenChange={keys => setOpenKeys(keys)}
        //     >
        //         <div className='sidemenu-header'>
        //             <img src={demoLogo} alt="" />
        //         </div>
        //         <Menu.ItemGroup label={'menu'} title="MENU">
        //             <Menu.Item key={'/menu-1'} icon={<HomeOutlined />}><Link to={'/menu-1'}>Menu 1</Link></Menu.Item>
        //             <Menu.Item key={'/menu-2'} icon={<HomeOutlined />}><Link to={'/menu-2'}>Menu 2</Link></Menu.Item>
        //             <Menu.SubMenu key={'/menu-3'} title={'Menu 3'} icon={<HomeOutlined />}>
        //                 <Menu.Item key={'/menu-3/submenu-1'}><Link to={'/menu-3/submenu-1'}>Submenu 1</Link></Menu.Item>
        //                 <Menu.Item key={'/menu-3/submenu-2'}><Link to={'/menu-3/submenu-2'}>Submenu 2</Link></Menu.Item>
        //             </Menu.SubMenu>
        //             <Menu.SubMenu key={'/menu-4'} title={'Menu 4'} icon={<HomeOutlined />}>
        //                 <Menu.Item key={'/menu-4/submenu-1'}><Link to={'/menu-4/submenu-1'}>Submenu 1</Link></Menu.Item>
        //                 <Menu.Item key={'/menu-4/submenu-2'}><Link to={'/menu-4/submenu-2'}>Submenu 2</Link></Menu.Item>
        //             </Menu.SubMenu>
        //         </Menu.ItemGroup>
        //     </Menu>
        // </Layout.Sider>
    )
}

export default Sidebar
