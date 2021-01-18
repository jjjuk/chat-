import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  messagePaper: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginBottom: 0,
    maxWidth: 460,
    // minWidth: 160,
    borderRadius: 10,
  },
  messageUser: {
    fontSize: '14px',
    color: theme.palette.secondary.dark,
  },
  messageText: {
    textAlignLast: 'start',
    whiteSpace: 'pre-wrap',
    paddingRight: 35,
    wordWrap: 'break-word',
  },
  messageTime: {
    zIndex: 1,
    fontSize: 12,
    color: theme.palette.text.secondary,
    position: 'relative',
    textAlign: 'right',
    marginTop: '-10px',
    marginBottom: '-5px',
  },

  messagePaperMine: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginBottom: 0,
    maxWidth: 460,

    // minWidth: 160,
    borderRadius: 10,
  },
  messageMe: {
    fontSize: '14px',
    color: theme.palette.primary.dark,
  },
  messageTextMine: {
    textAlignLast: 'start',
    whiteSpace: 'pre-wrap',
    paddingRight: 35,
  },
  messageTimeMine: {
    zIndex: 1,
    fontSize: 12,
    color: theme.palette.text.secondary,
    position: 'relative',
    textAlign: 'right',
    marginTop: '-10px',
    marginBottom: '-5px',
  },
  messagesBox: {
    /* display: 'flex', */
    maxHeight: 'calc(100vh - 90px)',
    paddingBottom: theme.spacing(1),
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100vh',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 0.6em rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '0.3em',
    },
  },
  chatBoxWrapper: {
    paddingLeft: theme.spacing(0.3),
    paddingRight: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
  },
  chatPaper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'flex-end',
  },
  messageInputBox: {
    '-webkit-box-shadow': '0px -2px 18px -13px rgb(0 0 0 / 0.5)',
    '-moz-box-shadow': '0px -2px 18px -13px rgb(0 0 0 / 0.5)',
    boxShadow: '0px -2px 18px -13px rgb(0 0 0 / 0.5)',
    display: 'flex',
    padding: theme.spacing(2),
  },
  sendButtonBox: {
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1)
  },
  sendButton: {
    width: 56,
    height: 56,
  },
  authFormBox: {
    marginTop: '8px !important',
    marginBottom: '8px !important',
  },
  authFormBoxButton: {
    marginTop: '16px !important',
    marginBottom: '8px !important',
  },
  fab: {
    position: 'fixed !important',
    zIndex: 2,
    top: theme.spacing(3),
    right: theme.spacing(5),
  },
  '@media screen and (max-width: 600px)': {
    messagePaperMine: {
      maxWidth: '310px !important',
    },
    messagePaper: {
      maxWidth: '310px !important',
    },
  },
}))

export const theme = createMuiTheme(require('theme.json'))
