"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const schema_1 = require("@nexus/schema");
const apollo_server_1 = require("apollo-server");
const utils_1 = require("../utils");
exports.Query = schema_1.queryType({
    definition(t) {
        t.field('me', {
            type: 'User',
            resolve: async (_, __, ctx) => {
                const id = Number(utils_1.getUserId(ctx));
                if (!id)
                    throw new apollo_server_1.AuthenticationError('Not Authorised!');
                return await ctx.prisma.user.findUnique({ where: { id } });
            },
        });
        t.crud.messages({
            ordering: true,
            pagination: true,
        });
    },
});
//# sourceMappingURL=query.js.map