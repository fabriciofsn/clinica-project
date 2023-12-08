"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medico = void 0;
const paciente_exception_1 = require("../paciente/paciente.exception");
const medico_exception_1 = require("./medico.exception");
const entity_1 = require("@shared/entity/entity");
class Medico extends entity_1.Entity {
    get nome() {
        return this._nome;
    }
    set nome(nome) {
        if (nome.length < Medico.TAMANHO_MINIMO_NOME) {
            throw new paciente_exception_1.Exceptions.NomeInvalido();
        }
        if (nome.length > Medico.TAMANHO_MAXIMO_NOME) {
            throw new paciente_exception_1.Exceptions.NomeInvalido();
        }
        this._nome = nome;
    }
    get idade() {
        return this._idade;
    }
    set idade(idade) {
        if (idade < 0) {
            throw new paciente_exception_1.Exceptions.IdadeInvalida();
        }
        this._idade = idade;
    }
    get CRM() {
        return this._CRM;
    }
    set CRM(CRM) {
        const regexp = /^\d{6}\/[A-Za-z]{2}$/;
        if (!regexp.test(CRM)) {
            throw new medico_exception_1.CRMinvalido();
        }
        this._CRM = CRM;
    }
    get endereco() {
        return this._endereco;
    }
    set endereco(endereco) {
        this._endereco = endereco;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(telefone) {
        this._telefone = telefone;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get especialidade() {
        return this._especialidade;
    }
    set especialidade(value) {
        this._especialidade = value;
    }
    constructor(dados) {
        super(dados.id);
        this.nome = dados.nome;
        this.CRM = dados.CRM;
        this.idade = dados.idade;
        this.telefone = dados.telefone;
        this.endereco = dados.endereco;
        this.status = dados.status;
        this.especialidade = dados.especialidade;
    }
    static createNewMedico(dados) {
        return new Medico(dados);
    }
}
exports.Medico = Medico;
Medico.TAMANHO_MINIMO_NOME = 3;
Medico.TAMANHO_MAXIMO_NOME = 40;
//# sourceMappingURL=medico.entity.js.map