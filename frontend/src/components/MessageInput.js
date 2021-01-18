import React, { useState } from 'react'

import { useMutation } from 'urql'
import { CREATE_MESSAGE } from 'api'

import { theme, useStyles } from 'useStyles'

import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/SendOutlined'
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined'

import Menu from '@material-ui/core/Menu'
import EmojiPicker from './EmojiPicker'

const MessageInput = () => {
  const classes = useStyles(theme)

  const [content, setContent] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  const [, createMessage] = useMutation(CREATE_MESSAGE)

  const handleSubmit = () => {
    createMessage({ content }).then(() => setContent(''))
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEmojiClick = ({ native }) => {
    setContent([content, native].join(' '))
  }

  const handleKeyDown = ({ key, ctrlKey }) => {
    !ctrlKey && key === 'Enter' && !!content && handleSubmit()
    ctrlKey && key === 'Enter' && setContent(content + '\n')
    key === 'Escape' && setContent('')
  }
  const handleChange = (e) => setContent(e.target.value)

  return (
    <div className={classes.messageInputBox}>
      <FormControl style={{ display: 'flex', width: '100%' }}>
        <InputLabel variant='outlined' children={'Message'} />
        <OutlinedInput
          label={'Message'}
          type='text'
          multiline
          variant='outlined'
          rowsMax={3}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
      <div className={classes.sendButtonBox}>
        <IconButton
          className={classes.sendButton}
          onClick={handleClick}
          color='primary'
        >
          <EmojiIcon style={{ fontSize: '1.3em' }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ style: { padding: 0 } }}
        >
          <EmojiPicker onClick={handleEmojiClick} />
        </Menu>
      </div>
      <div className={classes.sendButtonBox}>
        <IconButton
          onClick={handleSubmit}
          className={classes.sendButton}
          color='primary'
          disabled={!content}
        >
          <SendIcon style={{ fontSize: '1.3em' }} />
        </IconButton>
      </div>
    </div>
  )
}

export default MessageInput
