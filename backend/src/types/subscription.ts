import { subscriptionType } from '@nexus/schema'

export const Subscription = subscriptionType({
  definition(t) {
    t.field('newMessage', {
      type: 'Message',
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator('NEW_MESSAGE')
      },
      resolve: async (messagePromise: any) => {
        const message = await messagePromise
        return message
      },
    })
  },
})
