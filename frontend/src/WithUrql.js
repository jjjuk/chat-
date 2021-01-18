import { Component } from 'react'
import {
  createClient,
  Provider,
  defaultExchanges,
  subscriptionExchange,
} from 'urql'

import { SubscriptionClient } from 'subscriptions-transport-ws'

const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_WS_URL,
  {
    reconnect: true,
  }
)

const getToken = () => window?.localStorage.getItem('token')

function WithUrql(App) {
  const client = createClient({
    url: process.env.REACT_APP_SERVER_URL,
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation)
        },
      }),
    ],
    fetchOptions: () => {
      const token = getToken()
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })
  return class extends Component {
    render() {
      return (
        <Provider value={client}>
          <App />
        </Provider>
      )
    }
  }
}

export default WithUrql
