import {useState} from "react"
import auth from '../auth/auth-helper'
import {update} from './api-user'
import { Button } from "@material-ui/core"

export default function EditProfile({match}) {
  const [values, setValues] = useState({
    name: '',
    password: '',
    about: '',
    error: '',
    redirectToProfile: false,
  })

  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0] 
      : event.target.value 
    setValues({...values, [name]: value})
  }

  const clickSumbit = () => {
    let userData = new FormData()
    values.name && userData.append('name', values.name)
    values.email && userData.append('email', values.email)
    values.password && userData.append('password', values.password)
    values.about && userData.append('about', values.about)
    values.photo && userData.append('photo', values.photo)
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
      userData
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
          <span className={classes.filename}>
            {values.photo ? values.photo.name: ''}
          </span>
          <input accept="image/*" type="file" onChange={handleChange('photo')} style={{display: 'none'}} id="icon-button-file"/>
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default" component="span">Upload <FileUpload/></Button>
          </label>
          
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
