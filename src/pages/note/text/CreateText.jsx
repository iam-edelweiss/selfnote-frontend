import React, { useEffect } from 'react'
import { Button, Drawer, Form, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { resetNoteState } from 'store/Note/noteSlice'
import LoadingOverlay from 'components/LoadingOverlay'
import { createTextNote } from 'store/Note/noteAction'

const CreateText = ({open, setOpen, onCreated, categories}) => {

    const dispatch = useDispatch()
    const [ form ] = Form.useForm();
    const { isBreakpoint } = useSelector(state => state.Layout)
    const { isLoading: isLoadingNote, isSuccess: isSuccessNote, action: actionNote } = useSelector(state => state.Note)

    useEffect(() => {
        if (isSuccessNote && actionNote === 'create-textnote') {
            let formValues = form.getFieldsValue()
            Object.keys(formValues).forEach(key => {
                if(formValues[key] === undefined) formValues[key] = ''
            })

            onCreated(formValues)
        }
    }, [isLoadingNote])

    const handleClose = () => {
        setOpen(false)
    }

    const handleFinish = (values) => {
        Object.keys(values).forEach(key => {
            if(values[key] === undefined) values[key] = ''
        })
        dispatch(createTextNote(values))
    }

    const onOpenChange = (isOpen) => {
        if (isOpen) {
            
        } else {
            form.resetFields()
        }
    }

    return (
        <Drawer 
            title="Create New Text Note" placement="right" 
            afterOpenChange={onOpenChange}
            onClose={handleClose} open={open} 
            width={ isBreakpoint ? '100%' : '575px' } 
            style={{ overflowY: 'auto' }}
        >

            <LoadingOverlay 
                toggle={(isLoadingNote && actionNote === 'create-textnote')} 
            />

            <Form form={form} autoComplete='off' layout='vertical' onFinish={handleFinish} >

                <Form.Item
                    name={'title'} label={'Title'}
                    rules={[ { required: true }, { max: 50 } ]}
                >
                    <Input placeholder='Title' />
                </Form.Item>

                <Form.Item
                    name={'category'} label={'Category'}
                >
                    <Select placeholder='Select Category'>
                    { categories?.map(category => (
                        <Select.Option value={category._id} label={category.name} key={category._id} >
                            {category.name}
                        </Select.Option>
                    )) }
                    </Select>
                </Form.Item>

                
                <Form.Item
                    name={'description'} label={'Description'}
                    rules={[ { max: 1000 } ]} 
                >
                    <Input.TextArea placeholder='description' showCount maxLength={1000} rows={16}  />
                </Form.Item>

                <Form.Item className='mb-0'>
                    <Button type='primary' htmlType='submit' className={'px-5'}>Create</Button>
                </Form.Item>

            </Form>
        
        </Drawer>
    )
}

export default CreateText
