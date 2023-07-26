import React, { useEffect, useState } from 'react'
import MetaTags from 'components/MetaTags'
import { Button, Dropdown, Input, Select, Space, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTableNote, getTables } from 'store/Note/noteAction'
import { getCategories } from 'store/Category/categoryAction'
import { resetCategoryState } from 'store/Category/categorySlice'
import { resetNoteState } from 'store/Note/noteSlice'
import { CaretRightOutlined, DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import { toast } from 'react-toastify'
import CreateTable from './CreateTable'
import { Link, useNavigate } from 'react-router-dom'

const TableList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { isBreakpoint } = useSelector(state => state.Layout)
    
    const [ tables, setTables ] = useState([]) 
    const [ openCreate, setOpenCreate ] = useState()

    let { isLoading, isSuccess, action, data, successMessage } = useSelector(state => state.Note)
    const { isLoading: isLoadingCategory, data: categories, action: categoryAction } = useSelector(state => state.Category)
    const [ filter, setFilter ] = useState({ category: '', title: '' })
    
    let timeout = null

    useEffect(() => {
        getTableLists()
        dispatch(getCategories())
        return () => {
            dispatch(resetNoteState())
            dispatch(resetCategoryState())
        }
    }, [])

    useEffect(() => {
        if (!isLoading && isSuccess && action === 'delete-table') {
            toast.success(successMessage ?? "data success deleted")
            getTableLists()
        }
        if (!isLoading && isSuccess && action === 'get-tables') {
            data = data.map((dt, i) => { return { '#':i+1, key: dt._id, ...dt } })
            setTables(data)
        }        
    }, [isLoading])

    useEffect(() => {
        getTableLists()
    }, [filter])

    const getTableLists = () => {        
        dispatch(getTables(filter))
    }

    const handleSearch = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            setFilter((prevState) => ({
                ...prevState, title: e.target.value.replace(/\s+/g, ' ').trim()
            }))
        }, 800);
    }

    return (
        <>
            <MetaTags title={'Table Note'} />

            <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                    <span className="page-title">Table Note</span> 
                </div>
                <div className="col-6 text-end">
                    <Button type='primary' className='font-12' onClick={() => setOpenCreate(true)}>Create Table</Button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12">
                    <Space className='mb-2' style={{ display: isBreakpoint ? 'block' : 'inline-flex' }}>
                        <Select
                            mode="multiple" className='mb-2'
                            style={{ minWidth: '290px', width: '100%' }}
                            placeholder='select any category'
                            optionLabelProp="label" loading={isLoadingCategory && categoryAction === 'get-categories'}
                            onChange={vals => setFilter((prevState) => ({
                                ...prevState, category: vals.join(',')
                            }))}
                        >
                            {
                                categories?.map(category => (
                                    <Select.Option value={category._id} label={category.name} key={category._id} >
                                        <CaretRightOutlined className='me-2' />{category.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>

                        <Input
                            className='mb-2'
                            type='search' allowClear style={{ minWidth: '290px' }} placeholder='title'
                            onKeyUp={handleSearch} onChange={(handleSearch)}
                        />
                    </Space>


                    <div style={{width: '100%', overflowX: 'auto'}}>
                        <Table
                            loading={ (isLoading && action === 'get-tables') || (isLoadingCategory && categoryAction === 'get-categories') }
                            pagination={false}
                            columns={[
                                { title: '#', dataIndex: '#', className: '' },
                                { title: 'TITLE', dataIndex: 'title',},
                                { title: 'CATEGORY', dataIndex: 'category', render: (_, {category}) => category ? category.name : '-' },
                                { title: 'CREATED AT', dataIndex: 'created_at', 
                                render: (_, {created_at}) => (
                                    <span>{moment(created_at) //automatic timezone
                                    .format('dddd, D MMMM YYYY HH:mm')}</span>
                                )
                                },
                                { 
                                    title: 'ACTION', dataIndex: 'action', 
                                    render: (_, table) => {
                                        return (
                                        <Space>
                                            <Dropdown trigger={'click'}
                                                menu={{
                                                    style: { width: '120px'},
                                                    items: [
                                                        { key: `det${table._id}`, label: <Link to={`/notes/table/${table._id}`} className='font-12'>Detail</Link>, },
                                                        { key: `del${table._id}`, label: <span className='font-12'>Delete</span>, danger: true,
                                                        onClick: () => {
                                                            if(window.confirm(`Are you sure to delete category "${table.title}" ?`)) {
                                                                dispatch(deleteTableNote(table._id))
                                                            }
                                                        }
                                                        }
                                                    ]
                                                }}
                                            >
                                                <a className='fw-bold' onClick={(e) => e.preventDefault()}>Actions <DownOutlined /></a>
                                            </Dropdown>
                                        </Space>
                                        )
                                    }
                                },
                            ]}
                            dataSource={tables}
                        >
                            
                        </Table>
                    </div>
                </div>
            </div>

            <CreateTable 
                categories={categories}
                open={openCreate} setOpen={setOpenCreate}
                onCreated={ (values, response) => {
                    navigate(`/notes/table/${response._id}`)
                }}
            />
            
        </>
    )
}

export default TableList
