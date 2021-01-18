import React, { Fragment, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import Fab from '@material-ui/core/Fab'
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined'

import Auth from './Auth'

import { theme, useStyles } from 'useStyles'

const RedirectComponent = ({ children }) => {
  const classes = useStyles(theme)
  const isLoggedIn = window?.localStorage.getItem('token')
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    history.replace('/auth')
    history.push('/auth')
  }

  useEffect(() => {
    if (window && !isLoggedIn) {
      history.replace('/auth')
      history.push('/auth')
    }
  }, [isLoggedIn, history])

  return (
    <Switch>
      <Route exact path='/'>
        <Fragment>
          {children}
          <Fab
            color='secondary'
            className={classes.fab}
            onClick={handleLogout}
            children={<LogoutIcon />}
          />
        </Fragment>
      </Route>
      <Route path='/auth'>
        <Auth />
      </Route>
    </Switch>
  )
}

export default RedirectComponent
