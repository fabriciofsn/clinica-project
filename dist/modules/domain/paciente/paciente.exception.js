"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exceptions = void 0;
const domain_exception_1 = require("@shared/exception/domain.exception");
class NomeInvalido extends domain_exception_1.DomainException {
    constructor(message = 'Nome Inválido') {
        super(message);
        this.message = message;
    }
}
class CPFinvalido extends domain_exception_1.DomainException {
    constructor(message = 'CPF inválido') {
        super(message);
        this.message = message;
    }
}
class IdadeInvalida extends domain_exception_1.DomainException {
    constructor(message = 'Idade inválida') {
        super(message);
        this.message = message;
    }
}
class TelefoneInvalido extends domain_exception_1.DomainException {
    constructor(message = 'Telefone inválido') {
        super(message);
        this.message = message;
    }
}
exports.Exceptions = {
    NomeInvalido,
    CPFinvalido,
    IdadeInvalida,
    TelefoneInvalido
};
//# sourceMappingURL=paciente.exception.js.map