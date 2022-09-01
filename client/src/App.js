import { Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Home from "./pages/Home";
import './App.css'
import Header from './components/Header';
import Addresses from "./pages/Addresses";
import Rules from './pages/Rules'
import { useLayoutEffect } from 'react';
import { useDispatch } from "react-redux"
import axios from "axios";
import { citiesActions, suppliersActions, streetsActions, rulesActions } from './store'
import Suppliers from './pages/Suppliers';


function App() {
  const dispatch = useDispatch()

  const getSuppliers = () => {
      axios.get('http://localhost:3001/api/get-suppliers')
        .then((response) => {
          if(response.status === 200) {
            dispatch(suppliersActions.data(response.data))
          }
        })   
  }

const getRules = () => {
    axios.get('http://localhost:3001/api/get-rules')
    .then((response) => {
       dispatch(rulesActions.data(response.data))
    })
}

  const getCities = () => {
    axios.get('http://localhost:3001/api/get-cities')
    .then((response) => {
       dispatch(citiesActions.data(response.data))
    })
  }

  const getStreets = () => {
    axios.get('http://localhost:3001/api/get-streets')
    .then((response) => {
       dispatch(streetsActions.data(response.data))
    })
  }

  useLayoutEffect(() => {
      getCities()
      getStreets()
      getSuppliers()
      getRules()
  })


  return (
    <div className="App">
      <Header/>
      <Container>
      <Row>
        <Col>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/addresses' element={<Addresses/>} />
            <Route path='/rules' element={<Rules/>} />
            <Route path='/suppliers' element={<Suppliers/>}/>
          </Routes>
        </Col>
      </Row>
      </Container>
    </div>
  )
}

export default App;
