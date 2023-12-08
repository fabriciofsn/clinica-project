"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultaExceptions = void 0;
const domain_exception_1 = require("@shared/exception/domain.exception");
class ErrorDomainConsulta extends domain_exception_1.DomainException {
    constructor(message = 'Error consulta') {
        super(message);
        this.message = message;
    }
}
class ValorInválido extends ErrorDomainConsulta {
    constructor(message = 'Valor inválido! Valor não pode ser menor que zero') {
        super(message);
        this.message = message;
    }
}
exports.consultaExceptions = {
    ValorInválido,
};
//# sourceMappingURL=consulta.exception.js.map