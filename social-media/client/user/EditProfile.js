import {useState} from "react"
import auth from '../auth/auth-helper'
import {update} from './api-user'

export default function EditProfile({match}) {
  const [values, setValues] = useState({
    name: '',
    password: '',
    about: '',
    error: '',
    redirectToProfile: false,
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  const clickSumbit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      about: values.about || undefined,
      password: values.password || undefined,
    }

    update(
      {userId: match.params.userId},
      {t: jwt.token},
      user
    ).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirectToProfile: true})
      }
    })
  }

  if (values.redirectToProfile) return (<Redirect to={'/user/' + values.userId}/>)

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>Edit Profile</Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="multiline-flexible" type="text" label="About" className={classes.textField} value={values.about} onChange={handleChange('about')} margin="normal" multiline rows="2"/><br/>
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
