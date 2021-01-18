"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const schema_1 = require("@nexus/schema");
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../utils");
const apollo_server_1 = require("apollo-server");
exports.Mutation = schema_1.mutationType({
    definition(t) {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                name: schema_1.nonNull(schema_1.stringArg()),
                password: schema_1.nonNull(schema_1.stringArg()),
            },
            resolve: async (_, { name, password }, { prisma }) => {
                const existUser = await prisma.user.findFirst({
                    where: {
                        name,
                    },
                });
                if (!!(existUser === null || existUser === void 0 ? void 0 : existUser.name))
                    throw new apollo_server_1.UserInputError('User exists');
                const user = await prisma.user.create({
                    data: {
                        name,
                        password,
                    },
                });
                return {
                    user,
                    token: jsonwebtoken_1.sign(user.id.toString(), utils_1.appSecret),
                };
            },
        });
        t.field('login', {
            type: 'AuthPayload',
            args: {
                name: schema_1.nonNull(schema_1.stringArg()),
                password: schema_1.nonNull(schema_1.stringArg()),
            },
            resolve: async (_, { name, password }, { prisma }) => {
                const existUser = await prisma.user.findFirst({
                    where: {
                        name: { equals: String(name) },
                    },
                });
                if (!(existUser === null || existUser === void 0 ? void 0 : existUser.name))
                    throw new apollo_server_1.UserInputError('Wrong login');
                const user = await prisma.user.findUnique({
                    where: {
                        auth: {
                            name,
                            password,
                        },
                    },
                });
                if (!user)
                    throw new apollo_server_1.UserInputError('Wrong password');
                return {
                    user,
                    token: jsonwebtoken_1.sign(user.id.toString(), utils_1.appSecret),
                };
            },
        });
        t.field('createMessage', {
            type: 'Message',
            args: {
                content: schema_1.nonNull(schema_1.stringArg()),
            },
            resolve: async (_, { content }, ctx) => {
                const { prisma, pubsub } = ctx;
                const userId = Number(utils_1.getUserId(ctx));
                if (!userId)
                    throw new apollo_server_1.AuthenticationError('Not authorized');
                const message = await prisma.message.create({
                    data: {
                        content: utils_1.detect2007(content),
                        from: { connect: { id: userId } },
                        createdAt: Date.now().toString(),
                    },
                });
                !!message && pubsub.publish('NEW_MESSAGE', message);
                return message;
            },
        });
        t.field('deleteAllMessages', {
            type: 'Int',
            resolve: async (_, __, { prisma }) => {
                const { count } = await prisma.message.deleteMany({
                    where: { id: { not: 0 } },
                });
                return count;
            },
        });
    },
});
//# sourceMappingURL=mutation.js.map