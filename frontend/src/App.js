import React from 'react'
import WithUrql from './WithUrql'

import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from 'useStyles'

import Chat from 'components/Chat'
import Redirect from 'components/Redirect'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Redirect>
          <Chat />
        </Redirect>
      </Router>
    </ThemeProvider>
  )
}

export default WithUrql(App)
