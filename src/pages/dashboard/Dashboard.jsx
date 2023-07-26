import React, { useEffect, useState } from 'react'
import MetaTags from 'components/MetaTags'
import { Card, Statistic } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getNoteStatistic } from 'store/Note/noteAction'
import { getCategories } from 'store/Category/categoryAction'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { isLoading: loadingStatNote, isSuccess: isSuccessStatNote, action: actionNote, data: dataNote } = useSelector(state => state.Note)
    const { isLoading: loadingCategory, isSuccess: isSuccessCategory, action: actionCategory, data: dataCategory } = useSelector(state => state.Category)
    const [ countText, setCountText ] = useState(0)
    const [ countTable, setCountTable ] = useState(0)
    const [ countCategory, setCountCategory ] = useState(0)

    useEffect(() => {
        dispatch(getNoteStatistic())
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        if (isSuccessStatNote && actionNote === 'get-statistic') {
            if (dataNote.length) {
                setCountText(dataNote.filter(v => v.type === 'text')[0].count)
                setCountTable(dataNote.filter(v => v.type === 'table')[0].count)
            }
        }
        
        if (isSuccessCategory&& actionCategory === 'get-categories') {
            setCountCategory(dataCategory.length)
        }
        
    }, [loadingStatNote, loadingCategory])

    return (
        <>
            <MetaTags title={'Category'} />

            <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                    <span className="page-title">Dashboard</span> 
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12">
                    <Card>
                        <div className="row">
                            <div className="col-sm-4 mb-4 mb-sm-0">
                                <Statistic title={'Text'} value={countText} groupSeparator='.' loading={loadingStatNote} />
                            </div>
                            <div className="col-sm-4 mb-4 mb-sm-0">
                                <Statistic title={'Table'} value={countTable} loading={loadingStatNote} />
                            </div>
                            <div className="col-sm-4 mb-4 mb-sm-0">
                                <Statistic title={'Categories'} value={countCategory} loading={loadingCategory} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        </>
    )
}

export default Dashboard
