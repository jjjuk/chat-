import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useClient, useSubscription } from 'urql'
import Message from './Message'
import { MESSAGES, NEW_MESSAGES } from 'api'

import useSound from 'use-sound'

import sound from 'notification.mp3'

import { theme, useStyles } from 'useStyles'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView())
  return <div ref={elementRef} />
}

const Messages = ({ token }) => {
  const classes = useStyles(theme)
  const [messages, setMessages] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(false)
  const history = useHistory()

  const [notify] = useSound(sound)

  const client = useClient()

  useEffect(() => {
    messages.length === 0 &&
      client
        .query(MESSAGES)
        .toPromise()
        .then(({ data: { messages } }) => {
          setMessages(messages)
          setFetching(false)
        })
        .catch((error) => {
          setError(error)
          setFetching(false)
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('id')         
          history.replace('/auth')
          history.push('/auth')
        })
  })

  const myId = Number(window?.localStorage.getItem('id'))

  const [,] = useSubscription(
    {
      query: NEW_MESSAGES,
      context: { headers: { authorization: token ? `Bearer ${token}` : '' } },
    },
    (_, { newMessage }) => {
      newMessage.userId !== myId && notify()
      setMessages([...messages, newMessage])
    }
  )


  return !error ? (
    !fetching && !!window && (
      <div className={classes.messagesBox}>
        {messages.map((message) => (
          <Message message={message} key={message.id} myId={myId} />
        ))}
        <AlwaysScrollToBottom />
      </div>
    )
  ) : (
    <div>Oh, no... {error.message}</div>
  )
}

export default Messages
