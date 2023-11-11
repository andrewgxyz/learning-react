import React, { useState } from "react"
import {create} from './api-user'
import { Card, Button, CardActions, CardContent, Icon, TextField, Typography } from "@material-ui/core"

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  const clickSumbit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    }

    create(user).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', open: true})
      }
    })
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>Sign Up</Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
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
