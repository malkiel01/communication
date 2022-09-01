import { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import FormDialogRule from '../components/FormDialogRules'
import { rulesActions } from '../store'
import MyCardRule from '../components/MyCardRule'

const Rules = () => {
    const [myRules, setMyRules] = useState([]) 
    const typesInfrastructure = ['כבלים','נחושת','סיבים']
    const suppliers = useSelector(state => state.suppliers)
    const rules = useSelector(state => state.rules)
    const dispatch = useDispatch()
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/get-rules')
        .then((response) => {
            if(response.status === 200) {
           dispatch(rulesActions.data(response.data))
            }
        })
     },[])  
 
     const change = (e, index) => {
        if (index !== undefined) {
            setMyRules(myRules.flatMap((s,i) => i === index ? e : s))
            dispatch(rulesActions.data(rules.data.flatMap((s,i) => i === index ? e : s)))
        } else {
            // let temp = suppliers.data.slice()
            // temp.push(e)
            // setSuppliers2(temp)
            // dispatch(suppliersActions.data(temp))
        }
     }  

    return <>
     <h1>חוקים</h1>
     <FormDialogRule change={change}/>
        {rules.data && rules.data.map((rule, index) => 
        {return <MyCardRule 
            key={index} 
            data={rule} 
            
            change={(e) => change(e,index)}
            ></MyCardRule>}
        )}
     </>
}

export default Rules
