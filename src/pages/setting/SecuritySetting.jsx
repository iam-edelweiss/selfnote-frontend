import React, { useEffect } from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import FormLabel from 'components/FormLabel'
import { changePassword } from 'store/User/userAction'
import { logout, logoutAll } from 'store/Authentication/authActions'
import { useNavigate } from 'react-router-dom'
import { resetAuthState } from 'store/Authentication/authSlice'
import { toast } from 'react-toastify'

const SecuritySetting = () => {

    const { confirm } = Modal
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isSuccess, action, errorMessage, successMessage } = useSelector(state => state.User)
    const { isLoading: isLoadingAuth, isSuccess: isSuccessAuth, action: actionAuth } = useSelector(state => state.Auth)
    const [ form ] = Form.useForm()

    useEffect(() => {
        if (isSuccessAuth && (actionAuth === 'logout' || actionAuth === 'logout-all' )) {
            navigate('/login')
        }
        return () => dispatch(resetAuthState())
    }, [isSuccessAuth])

    useEffect(() => {
        if (isSuccess && action === 'change-password') {
            toast.success('Password Successfully Changed')
        }
        if (errorMessage && action === 'change-password') {
            toast.error(errorMessage)
        }
    }, [isLoading])
    
    const handleFinish = (values) => {
        dispatch(changePassword(values))
    }
    
    const handleLogout = () => {
        dispatch(logout())
    }

    const handleLogoutAll = () => {
        confirm({
            title: 'Remove all sessions ?',
            content: ( <span className='font-12'> You'll logged out from this session </span> ),
            onOk() {
                dispatch(logoutAll())
            },
            onCancel() { },
        });
    }

    return (
        <div className='ms-xs-5'>
            <div className="row mb-4">
                <div className="col-12 mb-4">
                    <div className="fw-bold font-16"> Change Password </div>
                </div>

                <div className="col-sm-8">

                    <Form form={form} onFinish={handleFinish} autoComplete='off'>
                        
                        <Form.Item 
                            name={'old_password'} label={<FormLabel>Old Password</FormLabel>}
                            rules={[
                                { required: true}, {min: 6}, {max: 20 }
                            ]}
                        >
                            <Input.Password placeholder='old password' disabled={isLoading && action === 'change-password'} />
                        </Form.Item>

                        <Form.Item 
                            name={'new_password'} label={<FormLabel>New Password</FormLabel>}                            
                            rules={[
                                { required: true}, {min: 6}, {max: 20 },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value === getFieldValue('old_password')) {
                                            return Promise.reject(`old_password and new_password can't be the same`)
                                        }
                                        return Promise.resolve()
                                    }
                                })
                            ]}
                        >
                            <Input.Password placeholder='new password' disabled={isLoading && action === 'change-password'}/>
                        </Form.Item>
                        
                        <Form.Item 
                            name={'confirm_password'} label={<FormLabel>Confirm New Password</FormLabel>}                            
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                        return Promise.reject(new Error('Password do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder='confirm new password' disabled={isLoading && action === 'change-password'}/>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type='primary' className='font-12 fw-bold px-5' htmlType='submit'
                                loading={isLoading && action === 'change-password'}
                            >Save Changes</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            
            <div className="row mb-4">
                <div className="col-12 mb-4">
                    <div className="fw-bold font-16"> Login Sessions </div>
                </div>

                <div className="col-sm-8">
                    <Space>
                        <Button className='font-12 fw-bold px-5' type='primary' onClick={() => handleLogout()} danger>Logout</Button>
                        <Button className='font-12 fw-bold px-5' type='default' onClick={() => handleLogoutAll()} danger>Logout From All Session</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default SecuritySetting
