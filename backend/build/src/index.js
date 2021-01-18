"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../generated/nexus");
require("../generated/typegen-nexus-plugin-prisma");
const apollo_server_1 = require("apollo-server");
const events_1 = require("events");
const schema_1 = require("@nexus/schema");
const nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
const client_1 = require("@prisma/client");
const graphql_middleware_1 = require("graphql-middleware");
const shield_1 = require("./middleware/shield");
const types = __importStar(require("./types"));
const eventEmitter = new events_1.EventEmitter();
eventEmitter.setMaxListeners(256);
const pubsub = new apollo_server_1.PubSub({ eventEmitter });
const prisma = new client_1.PrismaClient();
const rawSchema = schema_1.makeSchema({
    types,
    plugins: [
        nexus_plugin_prisma_1.nexusPrisma({
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
});
const schema = graphql_middleware_1.applyMiddleware(rawSchema, shield_1.permissions);
const server = new apollo_server_1.ApolloServer({
    schema,
    context: (req) => ({
        req,
        pubsub,
        prisma,
    }),
});
server.listen(3000);
//# sourceMappingURL=index.js.map