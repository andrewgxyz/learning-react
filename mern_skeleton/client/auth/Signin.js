import React, { useState } from "react"
import {signin} from './api-auth'
import { Card, Button, CardActions, CardContent, Icon, TextField, Typography } from "@material-ui/core"
import { Redirect } from "react-router-dom"

const classes = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

export default function Signin(props) {
  const [values, setValues] = useState({
    name: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  const clickSumbit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirectToReferrer: true})
      }
    })
  }

  const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
  }

  const {redirectToReferrer} = values

  if (redirectToReferrer) return (<Redirect to={from}/>)

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>Sign Up</Typography>
          <TextField id="email" type="email" label="email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/><br/>
          {
            values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
              </Typography>
            )
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSumbit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  )
}
