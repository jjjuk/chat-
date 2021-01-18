"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const utils_1 = require("../utils");
const isAuthenticated = graphql_shield_1.rule({ cache: 'contextual' })((_, __, ctx) => {
    return !!utils_1.getUserId(ctx);
});
exports.permissions = graphql_shield_1.shield({
    Query: {
        messages: isAuthenticated,
    },
}, {
    allowExternalErrors: true,
});
//# sourceMappingURL=shield.js.map