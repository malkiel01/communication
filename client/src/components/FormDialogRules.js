import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { suppliersActions } from '../store'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
    minWidth: '200px',
      width: '100%',
    },
  }))

export default function FormDialogRule(props) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const typesInfrastructure = ['כבלים','נחושת','סיבים']
    const [infrastructure, setInfrastructure] = useState('')
    const [supplier, setSupplier] = useState('')
    const [supplierFather, setSupplierFather] = useState(-1)
    const suppliers = useSelector(state => state.suppliers)
    
    const classes = useStyles()

   useEffect(() => {
    if(props.data !== undefined) {
      setSupplier(props.data.supplierId)
      setInfrastructure(props.data.infrastructure)
      setSupplierFather(props.data.supplierMainId)
    }
   },[props.data])

  const handleClickOpen = () => {
    setOpen(true)
    axios.get('http://localhost:3001/api/get-suppliers')
    .then((response) => {
      if(response.status === 200) {
       dispatch(suppliersActions.data(response.data))
      }
    }) 
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = (e) => {
    if (props.data !== undefined) {
      axios.put('http://localhost:3001/api/update-rule', 
        {id:props.data.id, 
          supplierId: supplier, 
          infrastructure: infrastructure, 
          supplierMainId: supplierFather})
      .then(() => {
          console.log('successfuly insert!')
      }) 
    } else {
      axios.post('http://localhost:3001/api/insesrt-rule', 
        {supplierId: supplier, infrastructure: infrastructure, supplierMainId: supplierFather})
      .then(() => {
          console.log('successfuly insert!')
      })        
    }
    props.change !== undefined && props.change({supplierId: supplier, infrastructure: infrastructure, supplierMainId: supplierFather})
    setOpen(false)
  }

  const test = (e) => {
    console.log(e)
  }

  return (
    <div>
        <div style={{ width: '100%' }}>
            <Box display="flex" flexDirection="row-reverse" >
                <Box >
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        {props.update ? 'עדכון חוק' : 'הוספת חוק'}
                    </Button>
                </Box>
            </Box>
        </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            {props.update ? 'עדכון חוק' : 'הוספת חוק'}
        </DialogTitle>
        <DialogContent>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="supplier-select">שם הספק</InputLabel>
            <Select 
            onChange={(e) => setSupplier(e.target.value === undefined ? '' : e.target.value)}
            value={supplier} 
            id="supplier-select">
            <ListSubheader>בחר את הספק</ListSubheader>
            {suppliers.data && suppliers.data.map((s,index) => {
              return <MenuItem key={index} value={s.id}>{s.name}</MenuItem>
            })}
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="infrastructure-select">הגדרת סוג התשתית</InputLabel>
            <Select 
            onChange={(e) => setInfrastructure(e.target.value === undefined ? '' : e.target.value)}
            value={infrastructure} 
            id="infrastructure-select">
            <ListSubheader>בחר את הגדרת התשתית</ListSubheader>
            {typesInfrastructure.map((inf,index) => <MenuItem key={index} value={index}>{inf}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="supplier-father-select">שם הספק האב</InputLabel>
            <Select 
            onChange={(e) => setSupplierFather(e.target.value === undefined ? '' : e.target.value)}
            value={supplierFather} 
            id="supplier-father-select">
            <ListSubheader>בחר את ספק האב</ListSubheader>
            {suppliers.data && suppliers.data.filter(s => s.type).map((s,index) => {
              return <MenuItem key={index} value={s.id}>{s.name}</MenuItem>
            })}
            </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            בטל
          </Button>
          <Button onClick={handleSave} color="primary">
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
