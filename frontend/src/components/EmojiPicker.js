import React, { memo } from 'react'

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { theme } from 'useStyles'

const EmojiPicker = (props) => (
  <Picker
    {...props}
    // native
    // enableFrequentEmojiSort
    set='twitter'
    useButton={false}
    color={theme.palette.primary.main}
    title={'..?emojies'}
    emoji={'space_invader'}
  />
)

export default memo(EmojiPicker)
