import { useEffect, useState } from "react"
import auth from '../auth/auth-helper'
import {read} from './api-user'
import { Redirect } from "react-router/cjs/react-router.min"
import DeleteUser from "./DeleteUser"

export default function Profile({match}) {
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const photoUrl = user._id 
    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
    : `/api/users/defaultPhoto`

  useEffect(() => {
    const abortCtrl = new AbortController()
    const signal = abortCtrl.signal
    const jwt = auth.isAuthenticated()

    read({userId: match.params.userId}, {t: jwt.token}, signal)
      .then((data) => {
        if (data && data.error) {
          setRedirectToSignin(true)
        } else {
          setUser(data)
        }
      })

    return function cleanup() {
      abortCtrl.abort()
    }
  }, [match.params.userId])

  if (redirectToSignin) {
    return <Redirect to='/signin'/>
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl}>
              <Person/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email}/>
          { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary"><Edit/></IconButton>
              </Link>
              <DeleteUser userId={user._id}/>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={this.state.user.about}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={"Joined: " + (
            new Date(user.created)).toDateString()}/>
        </ListItem>
      </List>
    </Paper>
  )
}
