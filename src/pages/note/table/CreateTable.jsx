import React, { useEffect, useRef, useState } from 'react'
import { Button, Drawer, Form, Input, Select, Tag } from 'antd'
import LoadingOverlay from 'components/LoadingOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { resetNoteState } from 'store/Note/noteSlice'
import { PlusOutlined } from '@ant-design/icons'
import Tags from 'components/Tags'
import { createTableNote } from 'store/Note/noteAction'
import { useNavigate } from 'react-router-dom'

const CreateTable = ({ open, setOpen, categories, onCreated }) => {

    const dispatch = useDispatch()

    const [ form ] = Form.useForm(); 
    const { isBreakpoint } = useSelector(state => state.Layout)
    const { isLoading: isLoadingNote, isSuccess: isSuccessNote, data, action: actionNote } = useSelector(state => state.Note)

    useEffect(() => {
        if (isSuccessNote && actionNote === 'create-table') {
            let formValues = form.getFieldsValue()
            Object.keys(formValues).forEach(key => {
                if(formValues[key] === undefined) formValues[key] = ''
            })

            onCreated(formValues, data)
        }
    }, [isLoadingNote])

    const handleClose = () => {
        setOpen(false)
    }

    const handleFinish = (values) => {

        Object.keys(values).forEach(key => {
            if(values[key] === undefined) values[key] = ''
        })

        dispatch(createTableNote({
            title: values.title,
            category: values.category,
            columns: values.columns.split('|')
        }))
    }

    const onOpenChange = (isOpen) => {
        if (isOpen) {
            
        } else {
            dispatch(resetNoteState())
            form.resetFields()
        }
    }
    

    return (
        <Drawer 
            title="Create New Table" placement="right" 
            afterOpenChange={onOpenChange}
            onClose={handleClose} open={open} 
            width={ isBreakpoint ? '100%' : '575px' } 
            style={{ overflowY: 'auto' }}
        >

            <LoadingOverlay 
                toggle={(isLoadingNote && actionNote === 'create-table')} 
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
                    name={'columns'} label={'Table Columns'} hidden
                    rules={[
                        { required: true, message: 'min 1 column required' }
                    ]} 
                >
                    <Input disabled />
                </Form.Item>                
                
                <Tags
                    label={'Columns'}
                    newTagLabel={(<span><PlusOutlined /> new column</span>)}
                    min={1} max={5}
                    onTagsChanged={(tags) => {
                        form.setFieldValue('columns', tags.join('|'))
                        if (tags.length > 0) form.setFields([ { name: 'columns', errors: [] } ])
                    }}
                    onError={(msg) => {
                        form.setFields([ { name: 'columns', errors: [msg] } ])
                    }}
                    forbiddenWords={['_id']}
                />  

                <Form.Item shouldUpdate>
                {() => {
                    return (
                        <p className='font-12 mb-2' style={{ color: '#ff4d4f', fontWeight: '500'}}> 
                            { form.getFieldError('columns') } 
                        </p>
                    )
                }}
                </Form.Item>
                                  

                <Form.Item className='mb-0'>
                    <Button type='primary' htmlType='submit' className={'px-5'}>Create</Button>
                </Form.Item>

            </Form>
        
        </Drawer>
    )
}

export default CreateTable
