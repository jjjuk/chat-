import '../generated/nexus'
import '../generated/typegen-nexus-plugin-prisma'

import { ApolloServer, PubSub } from 'apollo-server'
import { EventEmitter } from 'events'
import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './middleware/shield'

import * as types from './types'

const eventEmitter = new EventEmitter()
eventEmitter.setMaxListeners(256)

const pubsub = new PubSub({ eventEmitter })
const prisma = new PrismaClient()

const rawSchema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      shouldGenerateArtifacts: true,
      outputs: {
        typegen: __dirname + '/../generated/typegen-nexus-plugin-prisma.ts',
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/../generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})

const schema = applyMiddleware(rawSchema, permissions)

const server = new ApolloServer({
  schema,
  context: (req) => ({
    req,
    pubsub,
    prisma,
  }),
})

server.listen(3000)
