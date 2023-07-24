import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Input, Modal } from 'antd'
import { resetCategoryState } from 'store/Category/categorySlice';
import { createCategory } from 'store/Category/categoryAction';
import LoadingOverlay from 'components/LoadingOverlay';

const ModalCreate = ({open, setOpen, onCreated}) => {

    const dispatch = useDispatch();
    const { isLoading, isSuccess, action, errorMessage } = useSelector(state => state.Category)
    const [ form ] = Form.useForm();
    const categoryRef = useRef()

    useEffect(() => {
        if (isSuccess && !isLoading && action === 'create-category') {            
            let formValues = form.getFieldsValue()
            Object.keys(formValues).forEach(key => { if(formValues[key] === undefined) formValues[key] = '' })
            onCreated(formValues)
        }
    }, [isLoading])

    const handleHide = () => {
        dispatch(resetCategoryState())
        form.resetFields()
        setOpen(false)
    }

    const modalOpened = (isOpen) => {
        if (isOpen) categoryRef?.current.focus()     
        else {            
            form.resetFields()
        }  
    }

    const handleFinish = (values) => {
        dispatch(createCategory({name: values.category_name}))
    }


    return (
        <Modal 
            title="Create New Category" 
            style={{ top: 20 }} 
            open={open} 
            onCancel={() => handleHide()} afterOpenChange={modalOpened}
            footer={null} destroyOnClose
        >
            <LoadingOverlay toggle={isLoading && action === 'create-category'} />

            { errorMessage && action === 'create-category' && (
                <Alert type='error' className='mt-3' message={<span className='font-12 fw-bold'>{errorMessage}</span>} showIcon />
            )}
            
            <Form form={form} autoComplete='off' layout='vertical' onFinish={handleFinish} >
                <Form.Item
                    name={'category_name'} className='mt-4'
                    rules={[
                        { required: true }, { max: 50 }
                    ]}
                >
                    <Input
                        placeholder='Category Name' ref={categoryRef}
                    />
                </Form.Item>

                <Form.Item className='mb-0'>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default ModalCreate
