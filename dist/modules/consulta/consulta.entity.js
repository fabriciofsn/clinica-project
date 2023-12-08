"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consulta = void 0;
const entity_1 = require("@shared/entity/entity");
const consulta_exception_1 = require("./consulta.exception");
class Consulta extends entity_1.Entity {
    get paciente() {
        return this._paciente;
    }
    set paciente(paciente) {
        this._paciente = paciente;
    }
    get medico() {
        return this._medico;
    }
    set medico(medico) {
        this._medico = medico;
    }
    get data() {
        return this._data;
    }
    set data(data) {
        this._data = data;
    }
    get valor() {
        return this._valor;
    }
    set valor(valor) {
        if (valor < 0) {
            throw new consulta_exception_1.consultaExceptions.ValorInválido();
        }
        this._valor = valor;
    }
    get paymentStatus() {
        return this._paymentStatus;
    }
    set paymentStatus(paymentStatus) {
        this._paymentStatus = paymentStatus;
    }
    get paymentMethod() {
        return this._paymentMethod;
    }
    set paymentMethod(paymentMethod) {
        this._paymentMethod = paymentMethod;
    }
    get statusConsulta() {
        return this._statusConsulta;
    }
    set statusConsulta(statusConsulta) {
        this._statusConsulta = statusConsulta;
    }
    constructor(dados) {
        super(dados.id);
        this.paciente = dados.paciente;
        this.medico = dados.medico;
        this.valor = dados.valor;
        this.data = dados.data;
        this.paymentMethod = dados.paymentMethod;
        this.statusConsulta = dados.statusConsulta;
        this.paymentStatus = dados.paymentStatus;
    }
    static marcarConsulta(dados) {
        return new Consulta(dados);
    }
}
exports.Consulta = Consulta;
//# sourceMappingURL=consulta.entity.js.map