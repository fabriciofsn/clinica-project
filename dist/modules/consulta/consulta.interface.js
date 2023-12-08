"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusConsulta = exports.paymentMethod = exports.paymentStatus = void 0;
var paymentStatus;
(function (paymentStatus) {
    paymentStatus["CONFIRMADO"] = "CONFIRMADO";
    paymentStatus["PENDENTE"] = "PENDENTE";
})(paymentStatus || (exports.paymentStatus = paymentStatus = {}));
var paymentMethod;
(function (paymentMethod) {
    paymentMethod["CART\u00C3O_DE_CREDITO"] = "CART\u00C3O DE CR\u00C9DITO";
    paymentMethod["CART\u00C3O_DE_DEBITO"] = "CART\u00C3O DE D\u00C9BITO";
    paymentMethod["PIX"] = "PIX";
    paymentMethod["EM_DINHEIRO"] = "EM DINHEIRO";
})(paymentMethod || (exports.paymentMethod = paymentMethod = {}));
var statusConsulta;
(function (statusConsulta) {
    statusConsulta["AGENDADA"] = "AGENDADA";
    statusConsulta["CANCELADA"] = "CANCELADA";
})(statusConsulta || (exports.statusConsulta = statusConsulta = {}));
//# sourceMappingURL=consulta.interface.js.map