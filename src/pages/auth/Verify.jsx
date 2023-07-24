import React, { useEffect } from 'react'
import MetaTags from 'components/MetaTags'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { resetAuthState } from 'store/Authentication/authSlice';
import { verify } from 'store/Authentication/authActions';
import { Alert } from 'antd';

const Verify = () => {
    
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, isSuccess, action, errorMessage, successMessage } = useSelector(state => state.Auth)

    useEffect(() => {
        let token = searchParams.get('token')
        dispatch(verify(token))
        return () => dispatch(resetAuthState())
    }, [])

    return (
        <div className="col-xs-8 col-md-5 col-lg-4 col-xl-4 mt-4 px-3">

            <MetaTags title={'Verify'} />

            {(() => {
                if (isLoading && action === "verify") return (
                    <>Verifying...</>
                )
                else if (isSuccess && action === "verify") return (
                    <>
                        <Alert type='success' showIcon className='font-12 fw-bold mb-2' message="email has been verification" />
                        <p className="font-12 text-center fw-bold">
                            <Link className='text-decoration-none' to={'/login'}>Go to login page</Link>
                        </p>
                    </>
                )
            })()}
        </div>
    )
}

export default Verify
