import { Alert, Button, Dropdown, Input, Select, Space, Table } from 'antd'
import Empty from 'components/Empty'
import MetaTags from 'components/MetaTags'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteDataFromTable, getTableNote } from 'store/Note/noteAction'
import { resetNoteState } from 'store/Note/noteSlice'
import InsertDataTable from './InsertDataTable'
import { DownOutlined } from '@ant-design/icons'
import EditDataTable from './EditDataTable'

const TableDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { isSuccess, action, errorMessage, isLoading, data } = useSelector(state => state.Note)
    const [ table, settable ] = useState()

    const [ columns, setColumns ] = useState([])
    const [ tables, setTables ] = useState([])

    const [ filterColumn, setFilterColumn ] = useState("") 
    const [ filterValue, setFilterValue ] = useState("")

    const [ openInsertDataTable, setOpenInsertDataTable ] = useState(false)
    const [ openEditDataTable, setOpenEditDataTable ] = useState(false)
    const [ targetUpdate, setTargetUpdate ] = useState(null)
    
    let timeout = null

    useEffect(() => {
        return () => dispatch(resetNoteState())
    }, [])
    
    useEffect(() => {
        if (isSuccess && action === 'get-table') {
            handleColumns(data.data.column)
            handleTables(data.data.detail)
            settable(data)
        }
        if (isSuccess && action === 'delete-row')  {
            toast.success("data successfully deleted")
            getTable()
        }
    }, [isLoading])

    useEffect(() => {
        getTable()
    }, [filterColumn, filterValue])

    const getTable = () => {
        let param = { [filterColumn]: filterValue }
        dispatch(getTableNote({id, query: param ?? null }))
    }

    const handleColumns = (dataColumns) => {
        dataColumns = dataColumns.map(dataCol => {
            return { title: dataCol, dataIndex: dataCol}
        })
        setColumns([
            ...dataColumns,
            { title: 'ACTIONS', dataIndex: 'ACTIONS', render: (_, datatable) => (
                <Space>
                    <Dropdown trigger={'click'}
                        menu={{
                            style: { width: '120px'},
                            items: [
                                { key: `upd${datatable._id}`, label: <span className='font-12'>Edit</span>, 
                                    onClick: (e) => {
                                        setTargetUpdate(datatable)
                                        setOpenEditDataTable(true)
                                    } 
                                },
                                { key: `del${datatable._id}`, label: <span className='font-12'>Delete</span>, danger: true,
                                    onClick: () => handleDelete(datatable._id)
                                }
                            ]
                        }}
                    >
                        <a className='fw-bold' onClick={(e) => e.preventDefault()}>Actions <DownOutlined /></a>
                    </Dropdown>
                </Space>
            )}
        ])
    }

    const handleTables = (data) => {
        data = data.map((dt, i) => { return { '#':i+1, key: dt._id, ...dt } })
        setTables(data)
    }

    const handleDelete = (rowId) => {
        if (window.confirm(`Are you sure to delete data ?`)) {
            dispatch(deleteDataFromTable({tableId: id, rowId: rowId}))
        }
    }
    
    const handleSearch = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            setFilterValue(e.target.value.replace(/\s+/g, ' ').trim())
        }, 800);
    }

    if (errorMessage && action === 'get-table') return (
        <Alert type='error' message={errorMessage} showIcon />
    )

    return (
        <>
            <MetaTags title={'Text Note'} />

            <div className="row mb-3">
                <div className="col-6">
                    <div className="page-title w-100">{table?.title}</div> 
                    <p className='font-12 mb-0'>Show {table?.data.detail.length+` data${table?.data.detail.length > 1 ? "s" : ''}`} </p>
                </div>
                <div className="col-6 text-end">
                    <Button type='primary' className='font-12' onClick={() => setOpenInsertDataTable(true)}>Add New Data</Button>
                </div>
            </div>

            
            <div className="row mb-3">
                <div className="col-sm-6">
                        <Input 
                            addonBefore={
                                <Select value={filterColumn} onSelect={setFilterColumn} style={{width: '120px', fontSize: '12px'}}>
                                    <Select.Option value="">No filter</Select.Option>
                                    { table?.data.column.map(column => (
                                        <Select.Option key={column} value={column}>{column}</Select.Option>
                                    ))}
                                </Select>
                            } 
                            onKeyUp={handleSearch} onChange={(handleSearch)}
                            disabled={filterColumn === ""}
                            allowClear
                        />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <Table 
                        loading={ (isLoading && action === 'get-table') }
                        pagination={false}
                        columns={columns}
                        dataSource={tables}
                        locale={{
                            emptyText: <Empty extraComp={
                                            <Button type='primary' className='font-12 px-3 mb-3' onClick={() => setOpenInsertDataTable(true)}>Add New Data</Button>
                                        } />
                        }}
                    />
                </div>
            </div>

            <InsertDataTable 
                open={openInsertDataTable} setOpen={setOpenInsertDataTable} tablenote={table} 
                onCreated={(values, response) => {             
                    toast.success('Data successfully inserted')
                    setOpenInsertDataTable(false)       
                    getTable()
                }}
            />

            <EditDataTable
                table={table} row={targetUpdate}
                open={openEditDataTable} setOpen={setOpenEditDataTable}
                onUpdated={ values => {                    
                    toast.success('Data successfully updated')
                    setOpenEditDataTable(false)
                    getTable()
                }}
            />
        </>
    )
}

export default TableDetail
