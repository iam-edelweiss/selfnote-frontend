import React from 'react'

const FormLabel = ({children, description, className, htmlFor='', width=120, showRequired = false, ...props}) => {
  return (
    <div style={{ textAlign: 'start', width}}>
        <label 
            className={className ? className : 'font-12 fw-bold'} 
            htmlFor={htmlFor} 
            style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap', ...props.style }}
            {...props}
        >
            {children} { showRequired && (<span style={{ marginLeft: '10px', color: '#ff4d4f'}}>*</span>)}
        </label>

        <p style={{
            fontSize: '11px', 
            fontWeight: 200, 
            color: '#757575', 
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            marginBottom: 0
        }}>{description}</p>
    </div>
  )
}

export default FormLabel
