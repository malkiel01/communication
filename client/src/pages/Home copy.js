import { Button } from '@material-ui/core'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Suppliers } from '../controllers/database'
import { parse } from "papaparse"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Home = (props) => {
    const [suppliers, setSuppliers] = useState([])
    const [highlighted, setHighlighted] = useState(false)
    const [test, setTest] = useState(<input type="file" id="input" multiple></input>)
    // const selectedFile = document.getElementById('input').files[0]
    
    const inputElement = document.getElementById("input")
    useLayoutEffect(() => {
        inputElement && inputElement.addEventListener('click', console.log('dd'), false)
    },[test])
    // if(inputElement){
    //     inputElement.addEventListener('click', console.log('dd'), false);
    //   }
    // inputElement.addEventListener("click", console.log('dd'), false);
    const handleFiles = () => {
        // const fileList = this.files; /* now you can work with the file list */
        // console.log('e')
    }
    const GREY = '#CCC'
    const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)'
    const GREY_DIM = '#686868'
    const [contacts, setContacts] = useState([
      { email: "fake@gmail.com", name: "Fake" },
    ])

const styles = {
    zone: {
      alignItems: 'center',
      border: `2px dashed ${GREY}`,
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: 20,
      minHeight: '18rem'
    },
    file: {
      background: 'linear-gradient(to bottom, #EEE, #DDD)',
      borderRadius: 20,
      display: 'flex',
      height: 120,
      width: 120,
      position: 'relative',
      zIndex: 10,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    info: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
    },
    size: {
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      marginBottom: '0.5em',
      justifyContent: 'center',
      display: 'flex',
    },
    name: {
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      fontSize: 12,
      marginBottom: '0.5em',
    },
    progressBar: {
      bottom: 14,
      position: 'absolute',
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
    },
    zoneHover: {
      borderColor: GREY_DIM,
    },
    default: {
      borderColor: GREY,
    },
    remove: {
      height: 23,
      position: 'absolute',
      right: 6,
      top: 6,
      width: 23,
    },
  }

    return (
        <>
            <h1>Home </h1>
            <Button variant="contained">Contained</Button>
             {test}
            <Container>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Row className="justify-content-md-center">
                        <div
                            style={styles.zone}
                            className={`p-6 my-2 mx-auto max-w-md border-2`}
                            onDragEnter={() => {
                            setHighlighted(true);
                            }}
                            onDragLeave={() => {
                            setHighlighted(false);
                            }}
                            onDragOver={(e) => {
                            e.preventDefault();
                            }}
                            onDrop={(e) => {
                            e.preventDefault();
                            setHighlighted(false)

                            Array.from(e.dataTransfer.files)
                                .filter((file) => file.type === "text/csv")
                                .forEach(async (file) => {
                                const text = await file.text();
                                const result = parse(text, { header: true });
                                setContacts((existing) => [...existing, ...result.data]);
                                });
                            }}
                        >
                            <CloudUploadIcon  sx={{ fontSize: 100 }} />
                        </div>
                            {/* <input type={'file'} width='100%' height='100%' style={{display : 'none'}}>
                            <div
                            style={styles.zone}
                            className={`p-6 my-2 mx-auto max-w-md border-2`}
                            onDragEnter={() => {
                            setHighlighted(true);
                            }}
                            onDragLeave={() => {
                            setHighlighted(false);
                            }}
                            onDragOver={(e) => {
                            e.preventDefault();
                            }}
                            onDrop={(e) => {
                            e.preventDefault();
                            setHighlighted(false)

                            Array.from(e.dataTransfer.files)
                                .filter((file) => file.type === "text/csv")
                                .forEach(async (file) => {
                                const text = await file.text();
                                const result = parse(text, { header: true });
                                setContacts((existing) => [...existing, ...result.data]);
                                });
                            }}
                        >
                            DROP HERE
                        </div>
                            </input> */}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <h1 className="text-center text-4xl">Contact Import</h1>

    
        </>
    )
}

export default Home
