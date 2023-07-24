import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Form, Input, Modal } from 'antd'
import { getUserData } from 'utils/userData'
import FormLabel from 'components/FormLabel'
import { updateUser } from 'store/User/userAction'
import DeleteAccountModal from './DeleteAccountModal'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ProfileSetting = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ userInfo, setUserInfo ] = useState(getUserData())
    const { isLoading, isSuccess, action, errorMessage, successMessage } = useSelector(state => state.User)
    const [ form ] = Form.useForm()
    const [ showDeleteAccountModal, setShowDeleteAccountModal ] = useState(false)

    useEffect(() => {
        form.setFieldsValue({ name: userInfo.name })
    }, [])

    useEffect(() => {
        if (isSuccess && action === 'update-user') {
            setUserInfo(getUserData())
            toast.success('data successfully updated')
        }
        if (errorMessage && action === 'update-user') {
            toast.error(errorMessage)
        }
    }, [isLoading])

    const handleFinish = (values) => {
        dispatch(updateUser(values))
    }

    return (
        <div className='ms-xs-5'>

            <div className="row mb-3">

                <div className="col-12 mb-4">
                    <div className="fw-bold font-16"> Profile Setting </div>
                </div>

                <div className="col-sm-8">

                    <Form form={form} onFinish={handleFinish} autoComplete='off'>
                        <Form.Item label={<FormLabel>Email</FormLabel>}>
                            <Input value={userInfo.current_session.identifier} disabled hidden />
                            {userInfo.current_session.identifier}
                        </Form.Item>
                         
                        <Form.Item 
                            name={'name'} label={<FormLabel showRequired>Name</FormLabel>} 
                            rules={[ { required: true }, { max: 50 } ]}
                        >
                            <Input value={userInfo.name} placeholder='input name' disabled={isLoading && action === 'update-user'} />
                        </Form.Item>

                        <Form.Item shouldUpdate>
                            <Button 
                                type='primary' htmlType='submit' className='font-12 fw-bold px-5'
                                loading={isLoading && action === 'update-user'}
                            >
                                Save
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>

            <div className="row">

                <div className="col-12 mb-4">
                    <div className="fw-bold font-16 text-danger"> Remove Account </div>
                </div>

                <div className="col-sm-8">
                    <Button type='primary' className='font-12 fw-bold' onClick={() => setShowDeleteAccountModal(true)} danger>Remove Account</Button>
                    <DeleteAccountModal 
                        open={showDeleteAccountModal} setOpen={setShowDeleteAccountModal} 
                        onSuccess={() => {
                            navigate('/login')
                        }}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default ProfileSetting
