// import { useEffect, useState } from "react"
// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux" 
// import { citiesActions, suppliersActions, streetsActions, rulesActions, testActions } from '../store'
// import MyCardSupplier from "../components/MyCardSupplier"

// export const Suppliers = (props) => {
//    const [suppliers, setSuppliers] = useState([])

//    useEffect(() => {
//       axios.get('http://localhost:3001/api/get-suppliers')
//       .then((response) => {
//         if(response.status === 200) {
//          setSuppliers(response.data)
//         }
//       })   
//    },[])

//    useEffect(() => {
//       if(props.update) {
//          console.log('fff')
//       }
//    },[props])

//    return <>
//    {suppliers.map((supplier, index) => 
//    {return supplier.type === 1 && <MyCardSupplier key={index} data={supplier}></MyCardSupplier>}
//    )}
//    <h1>______________________________________________________________________________</h1>
// {suppliers.map((supplier, index) => 
//       {return !supplier.type && <MyCardSupplier key={index} data={supplier}></MyCardSupplier>}
//       )}

//    </>
   
// }