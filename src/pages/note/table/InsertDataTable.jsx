import React, { useEffect, useState } from 'react'
import { Alert, Button, Drawer, Form, Input } from 'antd'
import LoadingOverlay from 'components/LoadingOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { resetNoteState } from 'store/Note/noteSlice'
import { insertToTable } from 'store/Note/noteAction'

const InsertDataTable = ({ open, setOpen, onCreated, tablenote }) => {
    
    const dispatch = useDispatch()
    const [ form ] = Form.useForm(); 
    const { isBreakpoint } = useSelector(state => state.Layout)
    const { isLoading, isSuccess, action, data } = useSelector(state => state.Note)    
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
        if (isSuccess && action === 'insert-to-table') {
            let formValues = form.getFieldsValue()
            Object.keys(formValues).forEach(key => {
                if(formValues[key] === undefined) formValues[key] = ''
            })
            onCreated(formValues, data)
        }
    }, [isLoading])

    const handleClose = () => {
        setOpen(false)
    }

    const handleFinish = (values) => {
        setMessage(null)

        Object.keys(values).forEach(key => {
            if(values[key] === undefined) values[key] = ''
        })

        if (Object.values(values).filter(val => val !== '').length === 0) {
            setMessage(`data can't empty`)
            return
        }

        dispatch(insertToTable({ id: tablenote?._id, data: { row: values } }))
    }

    const onOpenChange = (isOpen) => {
        if (isOpen) {
            
        } else {
            // dispatch(resetNoteState())
            form.resetFields()
        }
    }

    return (
        <Drawer 
            title="Insert New Data" placement="right" 
            afterOpenChange={onOpenChange}
            onClose={handleClose} open={open} 
            width={ isBreakpoint ? '100%' : '575px' } 
            style={{ overflowY: 'auto' }}            
            maskClosable={false} //outside click
        >

            { message && (
                <Alert message={message} type='warning' className='font-12 mb-3' showIcon />
            )}

            <LoadingOverlay 
                toggle={(isLoading && action === 'insert-to-table')} 
            />

            <Form form={form} autoComplete='off' layout='vertical' onFinish={handleFinish} >
            { tablenote?.data.column.map((column, i) => (
                <Form.Item label={column} name={column} key={`insert${i}`}>
                    <Input placeholder={`input ${column.toLowerCase()}`} />
                </Form.Item>
            ))}

                <Form.Item>
                    <Button type='primary' htmlType='submit'>Create</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default InsertDataTable
