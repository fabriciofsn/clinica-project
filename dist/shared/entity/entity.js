"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const crypto_1 = require("crypto");
class Entity {
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    constructor(id) {
        this.id = id ? id : (0, crypto_1.randomUUID)();
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map