import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'No custom scalars are used in your Prisma Schema.'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Message: Prisma.Message
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'color' | 'password' | 'typing' | 'online' | 'Message'
      ordering: 'id' | 'name' | 'color' | 'password' | 'typing' | 'online'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'content' | 'userId' | 'from'
      ordering: 'id' | 'createdAt' | 'content' | 'userId'
    }
  },
  User: {
    Message: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'content' | 'userId' | 'from'
      ordering: 'id' | 'createdAt' | 'content' | 'userId'
    }
  }
  Message: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    message: 'Message'
    messages: 'Message'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneMessage: 'Message'
    updateOneMessage: 'Message'
    updateManyMessage: 'BatchPayload'
    deleteOneMessage: 'Message'
    deleteManyMessage: 'BatchPayload'
    upsertOneMessage: 'Message'
  },
  User: {
    id: 'Int'
    name: 'String'
    color: 'String'
    password: 'String'
    typing: 'Boolean'
    online: 'Boolean'
    Message: 'Message'
  }
  Message: {
    id: 'Int'
    createdAt: 'String'
    content: 'String'
    userId: 'Int'
    from: 'User'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Message: Typegen.NexusPrismaFields<'Message'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  