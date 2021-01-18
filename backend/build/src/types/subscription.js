"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const schema_1 = require("@nexus/schema");
exports.Subscription = schema_1.subscriptionType({
    definition(t) {
        t.field('newMessage', {
            type: 'Message',
            subscribe: (_, __, { pubsub }) => {
                return pubsub.asyncIterator('NEW_MESSAGE');
            },
            resolve: async (messagePromise) => {
                const message = await messagePromise;
                return message;
            },
        });
    },
});
//# sourceMappingURL=subscription.js.map