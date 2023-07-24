import React from 'react'
import emptyLogo from 'assets/images/empty.png'

const Empty = ({ extraComp }) => {
    return (
        <div style={{width: '100%', textAlign: 'center', alignItems: 'center'}}>
            <img src={emptyLogo} width={150} alt="" />
            <p className='font-14'>No Data</p>
            {extraComp}
        </div>
    )
}

export default Empty
