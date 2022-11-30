import CSVReaderDrag from "../components/ClickDragFile"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Button from "react-bootstrap/esm/Button"
import axios from "axios"

const Addresses = () => {
    const [dataStreets, setDataStreets] = useState([])  
    const [dataCities, setDataCities] = useState([])   
    const [updateCities, setUpdateCities] = useState(true) 
    const [updateStreets, setUpdateStreets] = useState(true)    

    const resultDataCities = (e) => { 
        setDataCities(e.data)   
    }
    const resultDataStreets = (e) => { 
        setDataStreets(e.data)   
    }
    useEffect(() => {
        dataCities !== undefined && dataCities.length > 0 ? setUpdateCities(false) : setUpdateCities(true)
        dataStreets !== undefined && dataStreets.length > 0 ? setUpdateStreets(false) : setUpdateStreets(true)
    },[dataCities,dataStreets])

    const sendData = () => {
        if (dataCities !== undefined && dataCities.length > 0) {
            axios.post('http://localhost:3001/api/insesrt-cities', {data: dataCities})
            .then(() => {
                console.log('successfuly insert!')
            })
        } else {
            console.log('data empty!')
        } 
    }


    return (
        <>
            <h1>Addresses</h1>
            <Container>
                <Row>
                    <Col>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={10} lg={10} style={{ minHeight: '18rem' }}>
                                <CSVReaderDrag res={resultDataCities} title="לעדכון ערים גרור לכאן את קובץ הערים"/>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={10} lg={10}>
                                <Button disabled={updateCities} 
                                    style={{ width: '100%', marginTop:'10px', marginBottom:'10px', padding: '15px', borderRadius: '25px' }} 
                                    onClick={() => sendData()}>
                                    עדכן קובץ
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={10} lg={10} style={{ minHeight: '18rem' }}>
                                <CSVReaderDrag res={resultDataStreets} title="לעדכון רחובות גרור לכאן את קובץ הרחובות"/>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={10} lg={10}>
                                <Button disabled={updateStreets} 
                                    style={{ width: '100%', marginTop:'10px', marginBottom:'10px', padding: '15px', borderRadius: '25px' }} 
                                    onClick={() => sendData()}>
                                    עדכן קובץ
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>




            {/* <InputBox data={useSelector(state => state.suppliers)} placeholder="הזן עיר" placeArr={0} result={resultData}></InputBox> */}
            {/* <FileUploadPage/> */}

            {/* <CSVReader/> */}

            

            {/* <Container>
                <Row xs={12} md={12} lg={12}>
                    <Col>
                        <CSVReaderDrag res={(e) => setData(e.data)} title="לעדכון ערים גרור לכאן את קובץ הערים"/>
                    </Col>
                </Row>
                <Row xs={12} md={12} lg={12}>
                    <Col>
                        <CSVReaderDrag  res={(e) => setData(e.data)} title="לעדכון רחובות גרור לכאן את קובץ רחובות"/>
                    </Col>
                </Row>
            </Container> */}

            {/* <MyTable header={header} ignore={ignore} data={data}/> */}


            
        </>
    )
}

export default Addresses