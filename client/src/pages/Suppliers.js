import { useEffect, useState } from 'react'
import FormDialogSupplier from '../components/FormDialogSupplier'
import axios from "axios"
import MyCardSupplier from '../components/MyCardSupplier'
import { useDispatch, useSelector } from 'react-redux'
import { suppliersActions } from '../store'



const Suppliers = () => {
    const [suppliers2, setSuppliers2] = useState([]) 
    const suppliers = useSelector(state => state.suppliers)
    const dispatch = useDispatch()
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/get-suppliers')
        .then((response) => {
          if(response.status === 200) {
           setSuppliers2(response.data)
           dispatch(suppliersActions.data(response.data))
          }
        })   
     },[])

     const change = (e, index) => {
        if (index !== undefined) {
            setSuppliers2(suppliers2.flatMap((s,i) => i === index ? e : s))
            dispatch(suppliersActions.data(suppliers.data.flatMap((s,i) => i === index ? e : s)))
        } else {
            let temp = suppliers.data.slice()
            temp.push(e)
            setSuppliers2(temp)
            dispatch(suppliersActions.data(temp))
        }
     }  

    return <>
     <h1>ספקים</h1>
     <FormDialogSupplier change={change}/>
        {suppliers.data && suppliers.data.map((supplier, index) => 
        {return supplier.type !== undefined && supplier.type === 1 && 
            <MyCardSupplier key={index} data={supplier} change={(e) => change(e,index)}></MyCardSupplier>}
        )}
        <hr style={{
            border : '10px solid green', borderRadius : '5px'
        }}></hr>
        {suppliers.data && suppliers.data.map((supplier, index) => 
        {return supplier.type !== undefined && supplier.type === 0 && 
            <MyCardSupplier key={index} data={supplier} change={(e) => change(e,index)}></MyCardSupplier>}
        )}
     </>
}

export default Suppliers
