import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, Input, Modal, Space } from 'antd'
import { QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from 'components/LoadingOverlay';
import { removeAccount } from 'store/User/userAction';


const DeleteAccountModal = ({open, setOpen, onSuccess}) => {

    const dispatch = useDispatch()
    const [ form ] = Form.useForm()
    const { isSuccess, isLoading, errorMessage, action } = useSelector(state => state.User)
    const passwordRef = useRef()

    useEffect(() => {
        if (isSuccess && action === 'remove-account') {
            console.log('success')
            onSuccess()
        }
    }, [isLoading])

    const handleShow = (isOpen) => {
        passwordRef.current.focus()
        form.setFields([ { name: 'password', value: '', errors:[] } ])
    }

    const handleHide = () => {
        form.resetFields()
        setOpen(false)
    }

    const handleConfirm = () => {
        dispatch(removeAccount({ password: form.getFieldValue('password') }))
    }

    return (
        <Modal 
            open={open} closable={false} width={416}
            afterOpenChange={handleShow}
            footer={null}
        >
            <div className="w-100">

                <LoadingOverlay toggle={isLoading && action === 'remove-account'} />

                <Space size={15} align="start">
                    <div className="font-24" >
                        <WarningOutlined className="text-danger" /> 
                    </div>
                    <Space className="pt-2" direction="vertical">
                        <div className="fw-bold">Delete this account ?</div>

                        { errorMessage && (<Alert type='error' className='font-12' message={errorMessage} showIcon />) }

                        <div className='mb-2'>
                            <span className='font-12'>
                                After deleting account, you can't recover it. But you can create a new account again.
                                To continue please type your <b>login password</b> here
                            </span>
                        </div>
                        <div>
                            <Form form={form}>
                                <Form.Item className='mb-4' name={'password'} rules={[ {required: true} ]} shouldUpdate>
                                    <Input.Password ref={passwordRef} placeholder='type your password' />
                                </Form.Item>

                                <Space>
                                    <button className="btn btn-danger font-12" onClick={e => handleConfirm()}>Confirm</button>
                                    <button className="btn btn-light font-12" onClick={e => handleHide()}>Cancel</button>
                                </Space>
                            </Form>
                        </div>
                    </Space>
                </Space>
            </div>
        </Modal>
    )
}

export default DeleteAccountModal
