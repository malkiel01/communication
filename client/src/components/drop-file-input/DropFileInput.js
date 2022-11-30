import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { parse } from 'papaparse'
import axios from "axios"
import './drop-file-input.css'
import './drop-file-input.scss'
import { ImageConfig } from '../../config/imageConfig'
import uploadImg from '../../assets/upload.webp'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import Row from 'react-bootstrap/esm/Row'
import { purple } from '@mui/material/colors';import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
 
  import "@reach/listbox/styles.css";


export const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
      styleCity: props => ({width: props.widthCity}),
      styleStreet: props => ({width: props.widthStreet}),
      styleZipcode: props => ({width: props.widthZipcode}),
      loadingBar: {
          opacity: 1,
          background: '#f00',
          // animation: load infinite 5s;
          position: 'relative',
          borderRadius: '4px',
          height: '25px'   
      },
      hidden: {
        visibility: 'hidden'
      }
}));
 
const DropFileInput = props => {
    const [style, setstyle] = useState({
        widthCity: '0%',
        widthStreet: '0%',
        widthZipcode: '0%'});
    const classes = useStyles(style);
    const [status, setStatus] = useState({city: 0, street: 0, zip_code: 0})
    const [update, setUpdate] = useState(false)
    const [fileList, setFileList] = useState([])
    const [fileCity, setFileCity] = useState(null)
    const [dataCity, setDataCity] = useState(null)
    const [fileStreet, setFileStreet] = useState(null)
    const [dataStreet, setDataStreet] = useState(null)
    const [fileZip, setFileZip] = useState(null)
    const [dataZip, setDataZip] = useState(null)
    const typeData = [
        { id: 0, name: 'קובץ ערים'},
        { id: 1, name: 'קובץ רחובות'},
        { id: 2, name: 'קובץ מיקוד' },
      ]  
    const fileRemove = (file) => {
        console.log(file);
        const uploadList = [...fileList]
        uploadList.splice(fileList.indexOf(file), 1)
        setFileList(uploadList)
        props.onFileChange(uploadList)
    }
    const sendData = () => {
        setUpdate(true)
            axios.post('http://localhost:3001/api/insesrt-cities', {data: dataCity})
            .then(() => {
                console.log('successfuly insert!')
            })
            axios.post('http://localhost:3001/api/insesrt-streets', {data: dataStreet})
            .then(() => {
                console.log('successfuly insert!')
            })
            axios.post('http://localhost:3001/api/insesrt-postal', {data: dataZip})
            .then((response) => {
                console.log(response);
             })
             do {
                setInterval(() => {
                    axios.get('http://localhost:3001/api/get-status')
                        .then((response) => {
                        // console.log(response.data);
                        setStatus(response.data)
                        setstyle({widthCity: response.data.city + '%',
                                widthStreet: response.data.street + '%',
                                widthZipcode: response.data.zip_code + '%'})
                    })  
                },5000)
              }
              while (status.city === 100 && status.street === 100 && status.zip_code === 100);
             
    }
  return (
    <>
    <Row xs={12} md={12} lg={12} className='row-drop'>      
        {
            fileCity !== undefined && fileCity !== null ? (
            <div className='drop-file-preview'>
                <p className='drop-file-preview__title'>
                    הקובץ לעדכון ערים
                </p>    
                    <div className='drop-file-preview__item'>
                        <img src={ImageConfig[fileCity.type.split('/')[1]] ||
                        ImageConfig['default']} alt='' />
                        <div className='drop-file-preview__item__info'>
                            <p>{fileCity.name}</p>
                            <p>{fileCity.size}B</p>
                        </div>
                        <span className='drop-file-preview__item__del'
                                onClick={() => setFileCity(null) && setDataCity(null)}>x</span>
                        <span className='drop-file-preview__item__select'>
                            {
                                <Combobox aria-label="choose a fruit" openOnFocus>
                                    <ComboboxPopover className='combo'>
                                        <ComboboxList className='combolist'>
                                            {
                                                typeData.map((typeName, index) => {
                                                    return <ComboboxOption
                                                    onClick={() => {
                                                        fileCity.typeFile = typeName.name
                                                    }} 
                                                    key={index} 
                                                    value={typeName.name} 
                                                    className='combo-option'
                                                    />
                                                })
                                            }
                                        </ComboboxList>
                                    </ComboboxPopover>
                                </Combobox>
                            }
                        </span>
                            {
                            // update && 
                            <div className='loading-continer'>
                                <div className='loading-status' >
                                    <div className={`${classes.styleCity} ${classes.loadingBar}`} >
                                        <span className='percent'>
                                            {style.widthCity === '0%' ? null : style.widthCity}
                                        </span> 
                                    </div>
                                </div>
                            </div>}
                    </div>
            </div>
            ) : 
            <div className='drop-file-input'
            onDragEnter={() => {
                // setHighlighted(true)
            }}
            onDragLeave={() => {
                // setHighlighted(false)
            }}
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                // setHighlighted(false)
                e.preventDefault()
                Array.from(e.dataTransfer.files).filter(
                    (file) => file.type === "text/csv"
                ).forEach(
                    async (file) => {
                        const text = await file.text()
                        const res = parse(text, {
                            header: false
                        })
                        console.log(res.data)
                    }
                )
            }}
            onChange={(e) => {
                Array.from(e.target.files).filter(
                    (file) => file.type === "text/csv"
                ).forEach(
                    async (file) => {
                        const text = await file.text()
                        const res = parse(text, {header: false})
                        if(res.data.length > 1500 &&
                            res.data[0].length === 10 &&
                            res.data[0][9].slice(0, 2) === '20'
                            ) {
                            setFileCity({
                                name:file.name,
                                size: file.size,
                                type: file.type})
                            setDataCity(res.data)
                        } else {
                            setFileCity({
                                name:file.name,
                                size: 0,
                                type: 'text/text'})
                        }
                    }
                )
            }}>
                <div className='drop-file-input__label'>
                    <img src={uploadImg} alt='' />
                    <p>גרור לכאן את קובץ הערים המעודכן</p>
                </div>
                <input type='file' accept="text/csv" />
            </div>
        }
    </Row>
    <Row xs={12} md={12} lg={12} className='row-drop'>      
        {
            fileStreet !== undefined && fileStreet !== null ? (
            <div className='drop-file-preview'>
                <p className='drop-file-preview__title'>
                    הקובץ לעדכון רחובות
                </p>
                { 
                <div className='drop-file-preview__item'>
                    <img src={ImageConfig[fileStreet.type.split('/')[1]] ||
                    ImageConfig['default']} alt='' />
                    <div className='drop-file-preview__item__info'>
                        <p>{fileStreet.name}</p>
                        <p>{fileStreet.size}B</p>
                    </div>
                    <span className='drop-file-preview__item__del'
                            onClick={() => setFileStreet(null) && setDataStreet(null)}>x</span>
                    <span className='drop-file-preview__item__select'>
                        {
                            <Combobox aria-label="choose a fruit" openOnFocus>
                                <ComboboxPopover className='combo'>
                                    <ComboboxList className='combolist'>
                                        {
                                            typeData.map((typeName, index) => {
                                                return <ComboboxOption
                                                onClick={() => {
                                                    fileStreet.typeFile = typeName.name
                                                }} 
                                                key={index} 
                                                value={typeName.name} 
                                                className='combo-option'
                                                />
                                            })
                                        }
                                    </ComboboxList>
                                </ComboboxPopover>
                            </Combobox>
                        }
                    </span>
                    <div className='loading-continer'>
                        <div className='loading-status'>
                            <div className={`${classes.styleStreet} ${classes.loadingBar}`} >
                                <span className='percent'>
                                    {style.widthStreet === '0%' ? null : style.widthStreet}
                                </span> 
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            ) : 
            <div className='drop-file-input'
            onDragEnter={() => {
                // setHighlighted(true)
            }}
            onDragLeave={() => {
                // setHighlighted(false)
            }}
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                // setHighlighted(false)
                e.preventDefault()
                Array.from(e.dataTransfer.files).filter(
                    (file) => file.type === "text/csv"
                ).forEach(
                    async (file) => {
                        const text = await file.text()
                        const res = parse(text, {
                            header: false
                        })
                        console.log(res.data)
                    }
                )
            }}
            onChange={(e) => {
                Array.from(e.target.files).filter(
                    (file) => file.type === "text/csv"
                ).forEach(
                    async (file) => {
                        const text = await file.text()
                        const res = parse(text, {header: false})
                        if(res.data.length > 100000 &&
                            res.data[0].length === 8 &&
                            res.data[0][2].length === 4 &&
                            res.data[0][7].slice(0, 2) === '20'
                            ) {
                            setFileStreet({
                                name:file.name,
                                size: file.size,
                                type: file.type})
                            setDataStreet(res.data)
                        } else {
                            setFileStreet({
                                name:file.name,
                                size: 0,
                                type: 'text/text'})
                        }
                    }
                )
            }}>
                <div className='drop-file-input__label'>
                    <img src={uploadImg} alt='' />
                    <p>גרור לכאן את קובץ הרחובות המעודכן</p>
                </div>
                <input type='file' accept="text/csv" />
            </div>
        }
    </Row>
    <Row xs={12} md={12} lg={12} className='row-drop'>      
        {
            fileZip !== undefined && fileZip !== null ? (
            <div className='drop-file-preview'>
                <p className='drop-file-preview__title'>
                    הקובץ לעדכון מיקודים
                </p>
                { 
                <div className='drop-file-preview__item'>
                    <img src={ImageConfig[fileZip.type.split('/')[1]] ||
                    ImageConfig['default']} alt='' />
                    <div className='drop-file-preview__item__info'>
                        <p>{fileZip.name}</p>
                        <p>{fileZip.size}B</p>
                    </div>
                    <span className='drop-file-preview__item__del'
                            onClick={() => setFileZip(null) && setDataZip(null)}>x</span>
                    <span className='drop-file-preview__item__select'>
                        {
                            <Combobox aria-label="choose a fruit" openOnFocus>
                                <ComboboxPopover className='combo'>
                                    <ComboboxList className='combolist'>
                                        {
                                            typeData.map((typeName, index) => {
                                                return <ComboboxOption
                                                onClick={() => {
                                                    fileZip.typeFile = typeName.name
                                                }} 
                                                key={index} 
                                                value={typeName.name} 
                                                className='combo-option'
                                                />
                                            })
                                        }
                                    </ComboboxList>
                                </ComboboxPopover>
                            </Combobox>
                        }
                    </span>
                    <div className='loading-continer'>
                        <div className='loading-status'>
                            <div className={`${classes.styleZipcode} ${classes.loadingBar}`} >
                                <span className='percent'>
                                    {style.widthZipcode === '0%' ? null : style.widthZipcode}
                                    </span> 
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            ) : 
            <div className='drop-file-input'
            onDragEnter={() => {
                // setHighlighted(true)
            }}
            onDragLeave={() => {
                // setHighlighted(false)
            }}
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                // setHighlighted(false)
                e.preventDefault()
                Array.from(e.dataTransfer.files).filter(
                    (file) => file.type === "text/csv"
                ).forEach(
                    async (file) => {
                        const text = await file.text()
                        const res = parse(text, {
                            header: false
                        })
                        console.log(res.data)
                    }
                )
            }}
            onChange={(e) => {
                Array.from(e.target.files).filter(
                    (file) => file.type === "text/csv"
                ).forEach(
                    async (file) => {
                        const text = await file.text()
                        const res = parse(text, {header: false})
                        if(res.data.length > 650000 &&
                            res.data[0][2].length === 4 &&
                            res.data[0].length === 13 &&
                            res.data[0][12].slice(0, 2) === '20'
                            ) {
                            setFileZip({
                                name:file.name,
                                size: file.size,
                                type: file.type})
                            setDataZip(res.data)
                        } else {
                            setFileZip({
                                name:file.name,
                                size: 0,
                                type: 'text/text'})
                        }
                    }
                )
            }}>
                <div className='drop-file-input__label'>
                    <img src={uploadImg} alt='' />
                    <p>גרור לכאן את קובץ המיקודים המעודכן</p>
                </div>
                <input type='file' accept="text/csv" />
            </div>
        }
    </Row>
    <Row>
        <Button 
            xs={12} md={10} lg={10} 
            className='drop-file-btn'
            variant="contained"
            color="primary"
            disabled={
                fileCity === null ||
                fileStreet === null ||
                fileZip === null 
            }
            onClick={sendData}>
                עדכן נתונים
        </Button>
    </Row>
    <Button onClick={() => {
        axios.get('http://localhost:3001/api/get-status')
        .then((response) => {
          console.log(response.data);
        })   
    }}>
        בדיקת סטטוס
    </Button>
    <p></p>

        {
            fileList.length > 0 ? (
            <div className='drop-file-preview'>
                <p className='drop-file-preview__title'>
                    רשימת הקבצים שהועלו
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
                                <span className='drop-file-preview__item__select'
                                    >
                                        {
                                            <Combobox aria-label="choose a fruit" openOnFocus>
                                                <ComboboxInput className='combo-input' 
                                                placeholder='▼ נא הגדר את סוג הקובץ' 
                                                onChange={() => {
                                                    console.log('fileList.includes(item)');
                                                }}
                                                />
                                                <ComboboxPopover className='combo'>
                                                    <ComboboxList className='combolist'>
                                                        {
                                                            typeData.map((item1, index) => {
                                                                return <ComboboxOption
                                                                onClick={() => {
                                                                    console.log(item);
                                                                    item.typeFile = item1.name
                                                                    console.log(item);
                                                                }} key={index} value={item1.name} className='combo-option'/>
                                                            })
                                                        }
                                                    </ComboboxList>
                                                </ComboboxPopover>
                                            </Combobox>
                                        }
                                    </span>
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