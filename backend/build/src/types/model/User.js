"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const schema_1 = require("@nexus/schema");
exports.User = schema_1.objectType({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.password();
        t.model.typing();
        t.model.online();
    }
});
//# sourceMappingURL=User.js.map