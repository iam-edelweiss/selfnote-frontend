import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Form, Input, Modal } from 'antd'
import { updateCategory } from 'store/Category/categoryAction'
import { resetCategoryState } from 'store/Category/categorySlice'
import LoadingOverlay from 'components/LoadingOverlay'

const ModalUpdate = ({open, setOpen, category, onUpdated}) => {

    const dispatch = useDispatch()
    const [ form ] = Form.useForm();
    const { isLoading, isSuccess, action, errorMessage } = useSelector(state => state.Category)
    const categoryRef = useRef()

    useEffect(() => {
        if (!isLoading && isSuccess && action === 'update-category') {
            let formValues = form.getFieldsValue()
            Object.keys(formValues).forEach(key => {
                if(formValues[key] === undefined) formValues[key] = ''
            })

            onUpdated(formValues)
        }
    }, [isLoading])

    const handleHide = () => {
        dispatch(resetCategoryState())
        form.resetFields()
        setOpen(false)
    }

    const modalOpened = (isOpen) => {
        if (isOpen) {
            form.setFieldValue('category_name', category?.name)
            categoryRef?.current.focus()   
        }   
        else {            
            form.resetFields()
        }  
    }

    const handleFinish = (values) => {
        if (values.category_name === category?.name) {
            form.setFields([ {name: 'category_name', errors: ['nothing changes']} ])
            return
        }

        dispatch(updateCategory({id: category._id, data: { name: values.category_name }}))
    }

    return (
        <Modal 
            title="Update Category" 
            style={{ top: 20 }} 
            open={open} 
            onCancel={() => handleHide()} afterOpenChange={modalOpened}
            footer={null} destroyOnClose
        >
            <LoadingOverlay toggle={isLoading && action === 'update-category'} />

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
                    <Input placeholder='Category Name' ref={categoryRef} />
                </Form.Item>

                <Form.Item className='mb-0'>
                    <Button type='primary' htmlType='submit'>Save Changes</Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default ModalUpdate
