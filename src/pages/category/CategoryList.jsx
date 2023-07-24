import React, { useEffect, useState } from 'react'
import { Alert, Button, Dropdown, Space, Table } from 'antd'
import MetaTags from 'components/MetaTags'
import { useDispatch, useSelector } from 'react-redux'
import { resetCategoryState } from 'store/Category/categorySlice'
import { deleteCategory, getCategories } from 'store/Category/categoryAction'
import { DownOutlined } from '@ant-design/icons'
import ModalCreate from './ModalCreate'
import { toast } from 'react-toastify'
import ModalUpdate from './ModalUpdate'

const CategoryList = () => {

    const dispatch = useDispatch()
    let { isLoading, isSuccess, action, data, errorMessage, successMessage } = useSelector(state => state.Category)    
    
    const [ categories, setCategories ] = useState()
    const [ showModalCreate, setShowModalCreate ] = useState(false)
    const [ showModalUpdate, setShowModalUpdate ] = useState(false)
    const [ updateTarget, setUpdateTarget ] = useState(null)
    
    useEffect(() => {        
        getListCategories()
        return () => dispatch(resetCategoryState())
    }, [])

    useEffect(() => {
        if (!isLoading && isSuccess && action === 'get-categories') {            
            data = data.map((cat, i) => { return { '#':i+1, key: cat._id, ...cat } })
            setCategories(data)            
        }        
        if (!isLoading && successMessage && action === 'delete-category') {
            getListCategories()
            toast.success('Category has been successfully deleted')
        }
    }, [isLoading])

    const getListCategories = () => {
        dispatch(getCategories())
    }

    return (
        <>
            <MetaTags title={'Category'} />

            <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                    <span className="page-title">Categories</span> 
                </div>
                <div className="col-6 text-end">
                    <Button type='primary' className='font-12' onClick={e => setShowModalCreate(true)} >Create Category</Button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">

                    { errorMessage && action === 'get-categories' && (
                        <Alert type='error' className='mt-3' message={<span className='font-12 fw-bold'>{errorMessage}</span>} showIcon />
                    )}

                    {/* <Card> */}
                        <Table 
                            loading={isLoading && action === 'get-categories'}
                            pagination={false}
                            columns={[
                                { title: '#', dataIndex: '#', className: '' },
                                { title: 'NAME', dataIndex: 'name',},
                                { 
                                    title: 'ACTION', dataIndex: 'action', 
                                    render: (_, category) => {
                                        return (
                                        <Space>
                                            <Dropdown 
                                                menu={{
                                                    style: { width: '120px'},
                                                    items: [
                                                        { key: `upd${category._id}`, label: <span className='font-12'>Edit</span>, 
                                                          onClick: (e) => {
                                                            setUpdateTarget(category)
                                                            setShowModalUpdate(true)
                                                          } 
                                                        },
                                                        { key: `del${category._id}`, label: <span className='font-12'>Delete</span>, danger: true,
                                                          onClick: () => {
                                                            if(window.confirm(`Are you sure to delete category "${category.name}" ?`)) {
                                                                dispatch(deleteCategory(category._id))
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
                            dataSource={categories}
                        />
                    {/* </Card> */}
                </div>
            </div>

            <ModalCreate 
                open={showModalCreate} setOpen={setShowModalCreate}                           
                onCreated={ values => {
                    toast.success('category successfully created')
                    setShowModalCreate(false)
                    getListCategories()
                }}
            />
            
            <ModalUpdate 
                open={showModalUpdate} setOpen={setShowModalUpdate} 
                category={updateTarget}                 
                onUpdated={ values => {
                    toast.success('category successfully updated')
                    setShowModalUpdate(false)
                    getListCategories()
                }}
            />
        </>
    )
}

export default CategoryList
