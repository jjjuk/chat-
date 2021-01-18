import gql from 'graphql-tag'

const MessageFragment = gql`
  fragment Message on Message {
    id
    content
    from {
      id
      name
    }
    createdAt
    userId
  }
`

export const MESSAGES = gql`
  query {
    messages(orderBy: { createdAt: asc }, last: 100) {
      ...Message
    }
  }
  ${MessageFragment}
`

export const NEW_MESSAGES = gql`
  subscription {
    newMessage {
      ...Message
    }
  }
  ${MessageFragment}
`

export const CREATE_MESSAGE = gql`
  mutation createMessage($content: String!) {
    createMessage(content: $content) {
      id
    }
  }
`
export const ME = gql`
  query {
    me {
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const SIGNUP = gql`
  mutation signup($name: String!, $password: String!) {
    signup(name: $name, password: $password) {
      token
      user {
        id
      }
    }
  }
`
