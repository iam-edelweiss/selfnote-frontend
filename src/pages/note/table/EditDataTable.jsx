import { Alert, Button, Drawer, Form, Input } from 'antd';
import LoadingOverlay from 'components/LoadingOverlay';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDataFromTable } from 'store/Note/noteAction';
import { resetNoteState } from 'store/Note/noteSlice';

const EditDataTable = ({open, setOpen, table, row, onUpdated}) => {

    const dispatch = useDispatch()
    const [ form ] = Form.useForm();
    const { isBreakpoint } = useSelector(state => state.Layout)
    const { isLoading: isLoadingNote, isSuccess: isSuccessNote, action: actionNote } = useSelector(state => state.Note) 
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
        if (isSuccessNote && actionNote === 'update-row') {
            let formValues = form.getFieldsValue()
            Object.keys(formValues).forEach(key => {
                if(formValues[key] === undefined) formValues[key] = ''
            })

            onUpdated(formValues)
        }
    }, [isLoadingNote])

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
        
        dispatch(
            updateDataFromTable({ 
                tableId: table?._id, 
                rowId: row.id, 
                data: { row: values } 
            })
        )
    }

    const onOpenChange = (isOpen) => {
        if (isOpen) {
            table.data.column.forEach(col => form.setFieldValue(col, row[col]) )
        } else {
            // dispatch(resetNoteState())
            form.resetFields()
        }
    }

    return (
        <Drawer 
            title={`Update Datatable #${row?.id}`} placement="right" 
            afterOpenChange={onOpenChange}
            onClose={handleClose} open={open} 
            width={ isBreakpoint ? '100%' : '575px' } 
            style={{ overflowY: 'auto' }}
        >

            <LoadingOverlay 
                toggle={(isLoadingNote && actionNote === 'update-row')} 
            />

            { message && (
                <Alert message={message} type='warning' className='font-12 mb-3' showIcon />
            )}

            <Form form={form} autoComplete='off' layout='vertical' onFinish={handleFinish} >

                { table?.data.column.map(column => (
                    <Form.Item label={column} name={column} key={column} >
                        <Input placeholder={`input ${column}`} />
                    </Form.Item>
                ))}

                <Form.Item className='mb-0'>
                    <Button type='primary' htmlType='submit' className={'px-5'}>Save Changes</Button>
                </Form.Item>

            </Form>
        
        </Drawer>
    )
}

export default EditDataTable
