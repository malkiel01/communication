import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FormDialogSupplier from './FormDialogSupplier'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: '70%',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 10,
    direction: "ltr",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function MyCardSupplier(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.data && props.data.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.data && props.data.type === 1 ? 'ספק ראשי' : 'ספק משני'}
        </Typography>
      </CardContent>
      <CardActions>
        <FormDialogSupplier update={true} data={props.data} change={props.change} />
      </CardActions>
    </Card>
  );
}
