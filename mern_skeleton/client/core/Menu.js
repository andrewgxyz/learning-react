import React from 'react'
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import auth from "../auth/auth-helper";

const isActive = (history, path) => {
  if (history.location.path == path) {
    return {color: '#ff4081'}
  } else {
    return {color: '#ffffff'}
  }
}

const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">MERN Skeleton</Typography>
      <Link to="/">
        <Button aria-label="Home" style={isActive(history, "/")}>Home</Button>
      </Link>
      <Link to="/users">
        <Button aria-label="Users" style={isActive(history, "/users")}>User</Button>
      </Link>
      {
        !auth.isAuthenticated() ? (<span>
          <Link to="/signin">
            <Button aria-label="Signin" style={isActive(history, "/signin")}>Signin</Button>
          </Link>
          <Link to="/signup">
            <Button aria-label="Signup" style={isActive(history, "/signup")}>Signup</Button>
          </Link>
        </span>) : (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button aria-label="Signin" style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Profile</Button>
          </Link>
          <Link to="/signout">
            <Button aria-label="Signout" style={isActive(history, "/signout")}>Signout</Button>
          </Link>
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu
