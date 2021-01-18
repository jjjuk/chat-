"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const schema_1 = require("@nexus/schema");
const utils_1 = require("../../utils");
exports.Message = schema_1.objectType({
    name: 'Message',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.content();
        t.model.userId();
        t.model.from();
        t.boolean('mine', {
            resolve: ({ userId }, __, ctx) => Number(utils_1.getUserId(ctx)) === userId,
        });
    },
});
//# sourceMappingURL=Message.js.map