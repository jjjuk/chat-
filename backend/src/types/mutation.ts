import { mutationType, stringArg, nonNull } from '@nexus/schema'
import { sign } from 'jsonwebtoken'
import { appSecret, getUserId, detect2007 } from '../utils'
import { UserInputError, AuthenticationError } from 'apollo-server'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { name, password }, { prisma }) => {
        const existUser = await prisma.user.findFirst({
          where: {
            name,
          },
        })

        if (!!existUser?.name) throw new UserInputError('User exists')

        const user = await prisma.user.create({
          data: {
            name,
            password,
          },
        })

        return {
          user,
          token: sign(user.id.toString(), appSecret),
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        name: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { name, password }, { prisma }) => {
        const existUser = await prisma.user.findFirst({
          where: {
            name: { equals: String(name) },
          },
        })

        if (!existUser?.name) throw new UserInputError('Wrong login')

        const user = await prisma.user.findUnique({
          where: {
            auth: {
              name,
              password,
            },
          },
        })

        if (!user) throw new UserInputError('Wrong password')

        return {
          user,
          token: sign(user.id.toString(), appSecret),
        }
      },
    })

    t.field('createMessage', {
      type: 'Message',
      args: {
        content: nonNull(stringArg()),
      },
      resolve: async (_, { content }, ctx) => {
        const { prisma, pubsub } = ctx
        const userId = Number(getUserId(ctx))
        if (!userId) throw new AuthenticationError('Not authorized')       

        const message = await prisma.message.create({
          data: {
            content: detect2007(content),
            from: { connect: { id: userId } },
            createdAt: Date.now().toString(),
          },
        })

        !!message && pubsub.publish('NEW_MESSAGE', message)

        return message
      },
    })

    t.field('deleteAllMessages', {
      type: 'Int',
      resolve: async (_, __, { prisma }) => {
        const { count } = await prisma.message.deleteMany({
          where: { id: { not: 0 } },
        })
        return count
      },
    })
  },
})
