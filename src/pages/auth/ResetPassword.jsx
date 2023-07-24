import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { resetAuthState } from 'store/Authentication/authSlice';
import { Button, Form, Input } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons';
import { resetPassword } from 'store/Authentication/authActions';

const ResetPassword = () => {
    const dispatch = useDispatch()
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { isSuccess, action } = useSelector(state => state.Auth)

    useEffect(() => {
        return () => dispatch(resetAuthState())
    }, [])

    const handleFinish = (values) => {
        dispatch(resetPassword({password: values.password, token: searchParams.get('token')}))
    }

    return (
        <div className="col-xs-8 col-md-5 col-lg-4 col-xl-4 mt-4 px-3">
        { !isSuccess && (
            <Form 
                autoComplete='off'
                layout='vertical'
                onFinish={handleFinish}
            >

                <Form.Item
                    label="New Password" name={"password"}
                    rules={[
                        { required: true }, { max: 50 }                        
                    ]}
                >
                    <Input.Password placeholder='New Password' autoFocus />
                </Form.Item>
                
                <Form.Item
                    label="Confirm New Password" name={"confirm_password"}                    
                    rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Password do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='New Password' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Change Password
                    </Button>
                </Form.Item>

            </Form>
        )}

        { isSuccess && action === "reset-password" && (
            <div className="text-center">
                <CheckCircleOutlined className='text-success mb-3' style={{fontSize: "72px"}}/>
                <h6 className="mb-3">Password Successfully Changed</h6>

                <p className='font-12 text-center'>
                    Go to <Link to={'/login'} className='text-decoration-none fw-bold'>Login page</Link>
                </p>
            </div>
        )}
        </div>
    )
}

export default ResetPassword
