import React, { useEffect, useState } from 'react'
import MetaTags from 'components/MetaTags'
import { Button, Dropdown, Input, Select, Space, Table } from 'antd'
import { deleteTextNote, getTextNotes } from 'store/Note/noteAction'
import { resetNoteState } from 'store/Note/noteSlice'
import { resetCategoryState } from 'store/Category/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategories } from 'store/Category/categoryAction'
import { CaretRightOutlined, DownOutlined } from '@ant-design/icons'
import moment from 'moment/moment'
import CreateText from './CreateText'
import EditText from './EditText'

const TextList = () => {

    const dispatch = useDispatch()
    let { isBreakpoint } = useSelector(state => state.Layout)
    let { isLoading, isSuccess, action, data, successMessage } = useSelector(state => state.Note)
    const [ textNotes, setTextNotes ] = useState([]) 
    const { isLoading: isLoadingCategory, data: categories, action: categoryAction } = useSelector(state => state.Category)
    const [ filter, setFilter ] = useState({ category: '', title: '' })

    const [ openCreateDrawer, setOpenCreateDrawer ] = useState(false)
    const [ openUpdateDrawer, setOpenUpdateDrawer ] = useState(false)
    const [ targetUpdate, setTargetUpdate ] = useState(null)
    
    let timeout = null

    useEffect(() => {
        getTextNoteList()
        dispatch(getCategories())
        return () => {
            dispatch(resetNoteState())
            dispatch(resetCategoryState())
        }
    }, [])

    useEffect(() => {        
        if (!isLoading && isSuccess && action === 'delete-textnote') {
            toast.success(successMessage ?? "data success deleted")
            getTextNoteList()
        }
        if (!isLoading && isSuccess && action === 'get-textnotes') {
            data = data.map((dt, i) => { return { '#':i+1, key: dt._id, ...dt } })
            setTextNotes(data)
        }
        
    }, [isLoading])

    useEffect(() => {
        getTextNoteList()
    }, [filter])

    const getTextNoteList = () => {        
        dispatch(getTextNotes(filter))
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
            <MetaTags title={'Text Note'} />

            <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                    <span className="page-title">Text Note</span> 
                </div>
                <div className="col-6 text-end">
                    <Button type='primary' className='font-12' onClick={() => setOpenCreateDrawer(true)} >Create Textnote</Button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
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

                    <Table
                        loading={ (isLoading && action === 'get-textnotes') || (isLoadingCategory && categoryAction === 'get-categories') }
                        pagination={false}
                        columns={[
                            { title: '#', dataIndex: '#', className: '' },
                            { title: 'TITLE', dataIndex: 'title',},
                            { title: 'CATEGORY', dataIndex: 'category',render: (_, {category}) => category ? category.name : '-' },
                            { title: 'CREATED AT', dataIndex: 'created_at', 
                              render: (_, {created_at}) => (
                                <span>{moment(created_at) //automatic timezone
                                .format('dddd, D MMMM YYYY HH:mm')}</span>
                              )
                            },
                            { 
                                title: 'ACTION', dataIndex: 'action', 
                                render: (_, textnote) => {
                                    return (
                                    <Space>
                                        <Dropdown trigger={'click'}
                                            menu={{
                                                style: { width: '120px'},
                                                items: [
                                                    { key: `upd${textnote._id}`, label: <span className='font-12'>Edit</span>, 
                                                      onClick: (e) => {
                                                        setTargetUpdate(textnote)
                                                        setOpenUpdateDrawer(true)
                                                      } 
                                                    },
                                                    { key: `del${textnote._id}`, label: <span className='font-12'>Delete</span>, danger: true,
                                                      onClick: () => {
                                                        if(window.confirm(`Are you sure to delete this textnote "${textnote.title}" ?`)) {
                                                            dispatch(deleteTextNote(textnote._id))
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
                        dataSource={textNotes}
                    >
                        
                    </Table>
                </div>
            </div>

            <CreateText 
                categories={categories}
                open={openCreateDrawer} setOpen={setOpenCreateDrawer}
                onCreated={ values => {
                    getTextNoteList()
                    setOpenCreateDrawer(false)
                    toast.success('Textnote successfully created')
                }}
            />

            <EditText 
                note={targetUpdate} categories={categories}
                open={openUpdateDrawer} setOpen={setOpenUpdateDrawer}
                onUpdated={ values => {
                    getTextNoteList()
                    setOpenUpdateDrawer(false)
                    toast.success('Textnote successfully updated')
                }}
            />
        </>
    )
}

export default TextList
