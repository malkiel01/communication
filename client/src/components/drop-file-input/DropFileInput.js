import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import './drop-file-input.css'
import { ImageConfig } from '../../config/imageConfig'
import uploadImg from '../../assets/upload.webp'
 
const DropFileInput = props => {
    const wrapperRef = useRef(null)

    const [fileList, setFileList] = useState([]);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover')
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
    const onDrop = () => wrapperRef.current.classList.remove('dragover')

    const onFileDrop = (e) => {
        const newFile = e.target.files
        if(newFile) {
                const uploadList = [...fileList]
                Array.prototype.forEach.call(newFile, file => {
                    uploadList.push(file)
                  });
                setFileList(uploadList)
                props.onFileChange(uploadList)
        }
    }

    const fileRemove = (file) => {
        console.log(file);
        const uploadList = [...fileList]
        uploadList.splice(fileList.indexOf(file), 1)
        setFileList(uploadList)
        props.onFileChange(uploadList)
    }
  return (
    <>
        <div
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className='drop-file-input'
            >
            <div className='drop-file-input__label'>
                <img src={uploadImg} alt='' />
                <p>Drag & Drop your file here</p>
            </div>
            <input type='file' value='' onChange={onFileDrop} multiple/>
        </div>
        {
            fileList.length > 0 ? (
            <div className='drop-file-preview'>
                <p className='drop-file-preview__title'>
                    Ready to upload
                </p>
                {
                    fileList.map((item, index) => (
                        <div key={index}
                            className='drop-file-preview__item'>
                                <img src={ImageConfig[item.type.split('/')[1]] ||
                                ImageConfig['default']} alt='' />
                                <div className='drop-file-preview__item__info'>
                                    <p>{item.name}</p>
                                    <p>{item.size}B</p>
                                </div>
                                <span className='drop-file-preview__item__del'
                                        onClick={() => fileRemove(item)}>x</span>
                            </div>
                    ))
                }
            </div>
            ) : null
        }
    </>
  )
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput