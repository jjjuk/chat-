import React from 'react'

import Messages from './Messages'
import MessageInput from './MessageInput'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import { theme, useStyles } from 'useStyles'

const Chat = ({ token }) => {
  const classes = useStyles(theme)
  return (
    <Container maxWidth='md' style={{ maxHeight: '100vh' }}>
      <Paper className={classes.chatPaper} square>
        <div className={classes.chatBoxWrapper}>
          <Messages token={token} />
        </div>
        <MessageInput />
      </Paper>
    </Container>
  )
}

export default Chat
