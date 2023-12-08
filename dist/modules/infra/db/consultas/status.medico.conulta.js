"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveEnumFromMongo = void 0;
const consulta_interface_1 = require("@modules/consulta/consulta.interface");
const medico_interface_1 = require("@modules/domain/medico/medico.interface");
class resolveEnumFromMongo {
    static fromMongoToStatus(status) {
        if (status === 'ATIVO')
            return medico_interface_1.StatusMedico.ATIVO;
        if (status === 'INATIVO')
            return medico_interface_1.StatusMedico.INATIVO;
        if (status === 'AFASTADO')
            return medico_interface_1.StatusMedico.AFASTADO;
        if (status === 'FERIAS')
            return medico_interface_1.StatusMedico.FERIAS;
        if (status === 'LICENÇA')
            return medico_interface_1.StatusMedico.LICENCA;
        throw new Error('Status Médico Inválido!');
    }
    static fromMongoToPayment(payment) {
        if (payment === 'CONFIRMADO')
            return consulta_interface_1.paymentStatus.CONFIRMADO;
        if (payment === 'PENDENTE')
            return consulta_interface_1.paymentStatus.PENDENTE;
        throw new Error('Status do pagamento inválido!');
    }
    static fromMongoToStatusConsulta(status) {
        if (status === 'AGENDADA')
            return consulta_interface_1.statusConsulta.AGENDADA;
        if (status === 'CANCELADA')
            return consulta_interface_1.statusConsulta.CANCELADA;
        throw new Error('Status da consulta é inválido!');
    }
    static fromMongoToPaymentMethod(method) {
        if (method === 'CARTÃO DE CRÉDITO')
            return consulta_interface_1.paymentMethod.CARTÃO_DE_CREDITO;
        if (method === 'CARTÃO DE DÉBITO')
            return consulta_interface_1.paymentMethod.CARTÃO_DE_DEBITO;
        if (method === 'PIX')
            return consulta_interface_1.paymentMethod.PIX;
        if (method === 'EM DINHEIRO')
            return consulta_interface_1.paymentMethod.EM_DINHEIRO;
        throw new Error('Método de pagamento é inválido!');
    }
}
exports.resolveEnumFromMongo = resolveEnumFromMongo;
//# sourceMappingURL=status.medico.conulta.js.map