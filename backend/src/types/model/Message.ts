import { objectType } from '@nexus/schema'
import { getUserId } from '../../utils'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.content()
    t.model.userId()
    t.model.from()
    t.boolean('mine', {
      resolve: ({ userId }, __, ctx) => Number(getUserId(ctx)) === userId,
    })
  },
})
