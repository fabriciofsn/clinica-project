"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoExceptions = exports.CRMinvalido = void 0;
const domain_exception_1 = require("@shared/exception/domain.exception");
class MedicoException extends domain_exception_1.DomainException {
    constructor(message = 'Exceção Médico') {
        super(message);
        this.message = message;
    }
}
class CRMinvalido extends MedicoException {
    constructor(message = 'CRM inválido') {
        super(message);
        this.message = message;
    }
}
exports.CRMinvalido = CRMinvalido;
exports.MedicoExceptions = {
    CRMinvalido,
};
//# sourceMappingURL=medico.exception.js.map