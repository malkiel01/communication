import { createSlice, configureStore } from '@reduxjs/toolkit'

// slises -----------------------------------------------------------------
const citiesSlice = createSlice({
    name: 'cities',
    initialState: {data: []},
    reducers: {
        data(state, actions) {
            state.data = actions.payload
        }
    }
})
const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: {data : []},
    reducers: {
        data(state, actions) {
            state.data = actions.payload
        }
    }
})
const streetsSlice = createSlice({
    name: 'streets',
    initialState: {data: []},
    reducers: {
        data(state, actions) {
            state.data = actions.payload
        }
    }
})
const rulesSlice = createSlice({
    name: 'rules',
    initialState: {data: []},
    reducers: {
        data(state, actions) {
            state.data = actions.payload
        }
    }
})


// store ------------------------------------------------------------------
const store = configureStore({
    reducer: {
        cities: citiesSlice.reducer,
        suppliers: suppliersSlice.reducer,
        streets: streetsSlice.reducer,
        rules: rulesSlice.reducer,
    } 
})

// export -----------------------------------------------------------------
export const citiesActions = citiesSlice.actions
export const suppliersActions = suppliersSlice.actions
export const streetsActions = streetsSlice.actions
export const rulesActions = rulesSlice.actions
export default store;