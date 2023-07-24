import { Alert, Space } from 'antd'
import LoadingOverlay from 'components/LoadingOverlay'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { getUser } from 'store/User/userAction'
import { resetUserState } from 'store/User/userSlice'
import { getUserData } from 'utils/userData'
import logo from 'assets/images/selfnote.png'

const AuthLayout = () => {

    const dispatch = useDispatch()
    const [ userInfo, setUserInfo ] = useState(getUserData())
    const { isSuccess, isLoading, errorMessage, action } = useSelector(state => state.User)
    const { isLoading: isLoadingAuth, errorMessage: errorAuth } = useSelector(state => state.Auth)

    // CHECK USER IS LOGGEDIN
    useEffect(() => {
      async function fetchData() { await dispatch(getUser()) }
      fetchData()
      return () => dispatch(resetUserState())
    }, [])
    // END

    useEffect(() => {
      if (!isLoading && isSuccess && action === 'get-user') setUserInfo(getUserData())
      if (!isLoading && errorMessage && action === 'get-user') setUserInfo(null)
    }, [isLoading])

    if (userInfo) return (
      <Navigate to={"/dashboard"} />
    )

    return (
      <div className="container" style={{height: '100vh'}} >
        
        <LoadingOverlay toggle={(isLoading && action === 'get-user') || isLoadingAuth} />

          <div className="row d-flex justify-content-center" style={{minHeight: '15vh'}}>
              <div className="col-md-8 py-4 d-flex justify-content-center align-items-center">
                  {/* <h5 className='mb-0'>Self Note</h5>              */}
                  <img src={logo} alt="" height={50} />
              </div>
          </div>
          <div className="row d-flex justify-content-center" style={{height: "auto"}}>
              <div className="col-xs-8 col-md-5 col-lg-4 col-xl-3 px-3 d-flex justify-content-center align-items-end">
                
                  { errorAuth && (
                    <Alert
                      className='w-100 mb-3'
                      type='error' showIcon message={<span className='font-12'>{errorAuth}</span>}
                    />
                  ) }
              </div>
          </div>
          <div className="row d-flex justify-content-center" style={{height: "70%"}}>
              <Outlet />
          </div>
      </div>
  )
}

export default AuthLayout
