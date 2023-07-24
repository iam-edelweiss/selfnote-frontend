import React, { useEffect } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'store/Authentication/authActions'
import { resetAuthState } from 'store/Authentication/authSlice'

const Login = () => {
    
    const dispatch = useDispatch()
    const { isSuccess, action } = useSelector(state => state.Auth)

    useEffect(() => {
        return () => dispatch(resetAuthState())
    },[])

    const handleFinish = (values) => {
        dispatch(login(values))
    }

    if (isSuccess && action === 'login') return ( <Navigate to={'/dashboard'} /> )

    return (
        <div className="col-xs-8 col-md-5 col-lg-4 col-xl-3 mt-4 px-3">   

            <h6 className='mb-4'>Welcome back,</h6>

            <Form 
                autoComplete='off'
                layout='vertical'
                onFinish={handleFinish}
            >
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
                        { required: true }
                    ]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>
                
                <Form.Item>
                    <Button type='primary' htmlType='submit' block>Login</Button>
                </Form.Item>

                <p className='font-12 text-center mb-2'>
                    Dont have any account? <Link to={'/register'} className='text-decoration-none fw-bold'>Sign up</Link>
                </p>
                <p className='font-12 text-center'>
                    Forgot password? <Link to={'/req-reset-password'} className='text-decoration-none fw-bold'>Reset password</Link>
                </p>
            </Form>
        </div>
    )
}

export default Login
