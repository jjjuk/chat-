"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.appSecret = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.appSecret = process.env.APP_SECRET;
const getUserId = ({ req }) => {
    var _a, _b;
    const Authorization = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req.req) === null || _b === void 0 ? void 0 : _b.headers.authorization);
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const verifiedToken = jsonwebtoken_1.verify(token, exports.appSecret);
        return verifiedToken && verifiedToken;
    }
};
exports.getUserId = getUserId;
//# sourceMappingURL=getUserId.js.map