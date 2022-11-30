import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
    minWidth: '200px',
      width: '100%',
    },
  }))

export default function FormDialogSupplier(props) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    
    useEffect(() => {
      if(props.data !== undefined) {
        setName(props.data.name)
        setType(props.data.type)
      }
     },[props.data])
     
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    if (props.update) {
      axios.put('http://localhost:3001/api/update-supplier', 
      {id:props.data.id, 
        name: name, 
        type: type})
    .then(() => {
        console.log('successfuly insert!')
    }) 
    } else {
        axios.post('http://localhost:3001/api/insesrt-supplier', {name: name, type: type})
        .then(() => {
            console.log('successfuly insert!')
        })            
    }
    props.change !== undefined && props.change({name: name, type: type})
    setOpen(false)
  }

  return (
    <div>
        <div style={{ width: '100%' }}>
            <Box display="flex" flexDirection="row-reverse" >
                <Box >
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        {props.update ? 'עדכון ספק' : 'הוספת ספק'}
                    </Button>
                </Box>
            </Box>
        </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            {props.update ? 'עדכון ספק' : 'הוספת ספק'}
        </DialogTitle>
        <DialogContent>
        <FormControl className={classes.formControl}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="שם הספק"
            type="name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
