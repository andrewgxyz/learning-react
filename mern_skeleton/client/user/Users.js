import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Link, List, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@material-ui/core";
import { ArrowForward, Person } from "@material-ui/icons";
import {list} from './api-user.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
})

export default function Users() {
  // users is the getter for the list of users
  // setUsers is the setter for the users state
  const [users, setUsers] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <Paper className={styles.root} elevation={4}>
      <Typography variant="h6" className={styles.title}>Users</Typography>
      <List dense>
        {users.map((el, i) => {
          return <Link to={"/user/" + el._id} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><Person/></Avatar>
              </ListItemAvatar>
              <ListItemText primary={el.name}/>
              <ListItemSecondaryAction>
                <IconButton><ArrowForward/></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        })}
      </List>
    </Paper>
  )

}
