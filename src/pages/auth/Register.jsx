import React, { useEffect } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetAuthState } from 'store/Authentication/authSlice'
import { register } from 'store/Authentication/authActions'
import MetaTags from 'components/MetaTags'

const Register = () => {

    const dispatch = useDispatch()
    const { isSuccess, isLoading, action, errorMessage, successMessage } = useSelector(state => state.Auth)

    useEffect(() => {
        return () => dispatch(resetAuthState())
    }, [])

    const handleFinish = (values) => {
        dispatch(register(values))
    }
    
    return (
        <div className="col-xs-8 col-md-5 col-lg-4 col-xl-3 mt-4 px-3">

            <MetaTags title={'Register'} />

            { isSuccess && action === 'register' && (
                <>
                    <Alert
                        className='mb-2'
                        type='success' showIcon
                        message={<span className='font-12'>link verification has been sent to your email.</span>}
                    />
        
                    <p className="font-12 text-center fw-bold"><Link to={'/login'}>Go to login page</Link></p>
                </>
            )}

            { !isSuccess && (
                <>

                    <h6 className='mb-4'>Create new account,</h6>

                    <Form 
                        autoComplete='off'
                        layout='vertical'
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            label="Name"
                            name={"name"}
                            rules={[
                                { required: true, }, { min: 3 }, { max: 30 }
                            ]}
                        >
                            <Input placeholder='your name' />
                        </Form.Item>
        
                        <Form.Item
                            label="Email"
                            name={"email"}
                            rules={[
                                { required: true },
                                { type: 'email' },
                            ]}
                        >
                            <Input placeholder='email' />
                        </Form.Item>
                        
                        <Form.Item
                            label="Password"
                            name={"password"}
                            rules={[
                                { required: true },
                                { min: 6 }, { max: 20 },
                            ]}
                        >
                            <Input.Password placeholder='password' />
                        </Form.Item>
        
                        <Form.Item
                            label="Confirm Password"
                            name={"confirm_password"}
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
                            <Input.Password placeholder='password' />
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type='primary' htmlType='submit' block>Register</Button>
                        </Form.Item>
        
                        <p className='font-12 text-center mb-2'>
                            Have an account? <Link to={'/login'} className='text-decoration-none fw-bold'>Sign in</Link>
                        </p>
                    </Form>
                </>
            )}

            
        </div>
    )
}

export default Register
