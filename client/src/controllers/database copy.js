// import axios from "axios"
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { citiesActions, suppliersActions, streetsActions } from '../store';





// const GetSuppliers = () => {
//     const dispatch = useDispatch()
//     const getCities = () => {
//       axios.get('http://localhost:3001/api/get-cities')
//       .then((response) => {
//          dispatch(citiesActions.data(response.data))
//       })
//     }

//     return <>
//          {getCities()}
//       </>
//   }

 

// export const GetCities = () => {
//     const dispatch = useDispatch()
//     axios.get('http://localhost:3001/api/get-cities')
//     .then((response) => {
//        dispatch(citiesActions.data(response.data))
//     })
//   }

// export const GetStreets = () => {
//     const dispatch = useDispatch()
//     axios.get('http://localhost:3001/api/get-streets')
//     .then((response) => {
//        dispatch(streetsActions.data(response.data))
//     })
//   }

//   export {GetSuppliers}