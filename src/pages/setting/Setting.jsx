import React from 'react'
import MetaTags from 'components/MetaTags'
import { Tabs } from 'antd'
import ProfileSetting from './ProfileSetting'
import { useSelector } from 'react-redux'
import SecuritySetting from './SecuritySetting'

const Setting = () => {

    const { isBreakpoint } = useSelector(state => state.Layout)

    return (
        <>
            <MetaTags title={'Setting'} />

            <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                    <span className="page-title">Setting</span> 
                </div>
                <div className="col-6 text-end">
                </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center">
                <div className="col-sm-8">
                    <div className='card bg-transparent border-0'>
                        <Tabs tabBarStyle={{ marginBottom: '28px' }}
                            tabPosition={isBreakpoint ? 'top' : 'left'}
                            items={[
                                { key: 'profile', label: 'profile', children: <ProfileSetting />},
                                { key: 'security', label: 'security', children: <SecuritySetting />},
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting
