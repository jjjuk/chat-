import React, { memo } from 'react'

import { useStyles, theme } from 'useStyles'
import moment from 'moment'

import { withEmoji } from 'utils'

const Message = ({
  message: {
    content,
    from: { name },
    createdAt,
    userId,
  },
  myId,
}) => {
  const classes = useStyles(theme)
  const time = moment(Number(createdAt)).format('hh.mm')

  return myId !== userId ? (
    <div style={{ display: 'flex' }}>
      <div className={classes.messagePaper}>
        <div className={classes.messageUser} children={<b>{name}</b>} />
        <div className={classes.messageText + ' word-wrap'}>
          {withEmoji(content)}
        </div>
        <div className={classes.messageTime} children={time} />
      </div>
    </div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <div className={classes.messagePaperMine}>
        <div className={classes.messageMe} children={<b>{name}</b>} />
        <div className={classes.messageTextMine + ' word-wrap'}>
          {withEmoji(content)}
        </div>
        <div className={classes.messageTimeMine} children={time} />
      </div>
    </div>
  )
}

export default memo(Message)
