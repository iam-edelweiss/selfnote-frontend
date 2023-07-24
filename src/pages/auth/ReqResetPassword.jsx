import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import MetaTags from 'components/MetaTags'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { reqResetPassword } from 'store/Authentication/authActions'
import { resetAuthState } from 'store/Authentication/authSlice'

const ReqResetPassword = () => {

    const dispatch = useDispatch()
    const { isLoading, isSuccess, action, data, errorDetail } = useSelector(state => state.Auth)
    const [ countdown, setCountDown ] = useState(0)
    const [ timeRemining, setTimeRemining ] = useState(0)
    const [ email, setEmail ] = useState('')

    useEffect(() => {
        return () => dispatch(resetAuthState())
    }, [])

    useEffect(() => {
        if (isSuccess && action === "request-reset") setTimeRemining(data.allow_request_at)
        if (!isSuccess && action === "request-reset") setTimeRemining(errorDetail?.allow_request_at)
    }, [isLoading])

    useEffect(() => {
        setCountDown(Math.ceil( (+new Date(timeRemining) - new Date())/1000 ))
    }, [timeRemining])
    
    useEffect(() => {
        const interval = countdown > 0 && setInterval(() => {
          setCountDown(countdown-1)
        }, 1000)
    
        return () => clearInterval(interval)
    }, [countdown])

    const handleFinish = (values) => {
        dispatch(reqResetPassword({email: values.email}))
    }

    return (
        <div className="col-xs-8 col-md-5 col-lg-4 col-xl-4 mt-4 px-3">

            <MetaTags title={'Request Reset Password'} />

            { isSuccess && action === "request-reset" && (
                    <div className="text-center">
                        <CheckCircleOutlined className='text-success mb-3' style={{fontSize: "72px"}}/>
                        <h6 className="mb-3">Reset link has been sent to { email }</h6>

                        <p className='font-12 text-center'>
                            Go to <Link to={'/login'} className='text-decoration-none fw-bold'>Login page</Link>
                        </p>
                    </div>
            )}

            { !isSuccess && (
                <Form 
                    autoComplete='off'
                    layout='vertical'
                    onFinish={handleFinish}
                >

                    <Form.Item
                        label="Email" name={"email"}
                        rules={[
                            { required: true }, { type: 'email' }, { max: 50 }                        
                        ]}
                    >
                        <Input placeholder='email' onChange={e => setEmail(e.target.value)} autoFocus disabled={isLoading || countdown > 0} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' block disabled={isLoading || countdown > 0}>
                            Send Reset Link {countdown > 0 ? `(${countdown}s)` : ''}
                        </Button>
                    </Form.Item>

                </Form>
            )}
        </div>
    )
}

export default ReqResetPassword
