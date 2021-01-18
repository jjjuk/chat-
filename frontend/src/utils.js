import emoji from 'react-easy-emoji'

export const withEmoji = (input) => {
  return emoji(input, {
    baseUrl: 'https://twemoji.maxcdn.com/2/svg/',
    ext: '.svg',
    size: '',
    props: {
     className: 'emoji-render'
    }
  })
}
