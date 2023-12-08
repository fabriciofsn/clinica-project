"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message = 'Exceção De Domínio') {
        super(message);
        this.message = message;
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=domain.exception.js.map