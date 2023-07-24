import React, { useEffect, useRef, useState } from 'react'
import { Input, Tag } from 'antd';

const Tags = ({
        label, newTagLabel = 'add', 
        tags = [], 
        min = 1, max = 20,
        onError,
        onTagsChanged,
        forbiddenWords = []
    }) => {
    
    const inputRef = useRef(null)
    const [ tagsValue, setTagsValue ] = useState(tags)
    const [ inputVisible, setInputVisible ] = useState(false)
    const [ errorMsg, setErrorMsg ] = useState(null)
    const [ inputValue, setInputValue ] = useState('')

    const [ isFirstRender, setIsFirstRender ] = useState(true)

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus(); 
        }
    }, [inputVisible]);    

    useEffect(() => {
        if (!isFirstRender) {
            if (tagsValue < min) {
                setErrorMsg(`create min ${min} item`)
            }
            onTagsChanged(tagsValue)
        }
        setIsFirstRender(false)
    }, [tagsValue])

    useEffect(() => {
        if (errorMsg) onError(errorMsg)
    }, [errorMsg])

    const handleInputChange = (e) => {
        setInputValue(e.target.value.replace('|',''));
    };

    const handleInputConfirm = () => {   

        let inputVal= inputValue.replace(/\s+/g, ' ').trim()
        let err = null
        let tagsVal = tagsValue.map(word => word.toLowerCase())
        forbiddenWords = forbiddenWords.map(word => word.toLowerCase())

        if (inputVal !== '') {
            if (inputValue && tagsVal.indexOf(inputVal) !== -1) {
                err = `item name can't be the same`
            }
    
            if (tagsVal.length+1 > max) {
                err = `max. ${max} item allowed`
            }

            if (forbiddenWords.includes(inputVal.toLowerCase())) {
                err = `"${inputVal}" not allowed to use`
            }

            if (err) {
                setErrorMsg(err)
            } else {
                setTagsValue([...tagsValue, inputVal]);
                setErrorMsg(null)
            }
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleRemove = (removedTag) => {
        const newtagsValue = tagsValue.filter((tag) => tag !== removedTag);
        setTagsValue(newtagsValue);
    };

    return (
        <div className="form-group mb-1">
            { label && (<label className='font-12 fw-bold mb-2' htmlFor="">{label}</label>) }
            <div>
            { tagsValue.map(tag => (
                <Tag 
                    closable key={tag}
                    onClose={(e) => {
                        e.preventDefault()
                        handleRemove(tag)
                    }}
                >
                    {tag}
                </Tag>
            ))}

            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    autoComplete='off'
                    style={{ width: 98 }}
                    value={ inputValue }
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag onClick={() => setInputVisible(true)} style={{ cursor: 'pointer' }}>
                    {newTagLabel}
                </Tag>
            )}
            </div>      
        </div>
    )
}

export default Tags
