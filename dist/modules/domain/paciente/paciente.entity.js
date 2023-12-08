"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const entity_1 = require("@shared/entity/entity");
const paciente_exception_1 = require("./paciente.exception");
class Paciente extends entity_1.Entity {
    get nome() {
        return this._nome;
    }
    set nome(nome) {
        if (nome.length < Paciente.TAMANHO_MINIMO_NOME) {
            throw new paciente_exception_1.Exceptions.NomeInvalido();
        }
        if (nome.length > Paciente.TAMANHO_MAXIMO_NOME) {
            throw new paciente_exception_1.Exceptions.NomeInvalido();
        }
        this._nome = nome;
    }
    get CPF() {
        return this._CPF;
    }
    set CPF(CPF) {
        const regexp = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
        if (!regexp.test(CPF)) {
            throw new paciente_exception_1.Exceptions.CPFinvalido();
        }
        this._CPF = CPF;
    }
    get endereco() {
        return this._endereco;
    }
    set endereco(endereco) {
        this._endereco = endereco;
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
    get telefone() {
        return this._telefone;
    }
    set telefone(telefone) {
        const regexp = /^[0-9]{11}$/;
        ;
        if (!regexp.test(telefone)) {
            throw new paciente_exception_1.Exceptions.TelefoneInvalido();
        }
        this._telefone = telefone;
    }
    constructor(dados) {
        super(dados.id);
        this.nome = dados.nome;
        this.CPF = dados.CPF;
        this.endereco = dados.endereco;
        this.telefone = dados.telefone;
        this.idade = dados.idade;
    }
    static createNewPaciente(dados) {
        return new Paciente(dados);
    }
}
exports.Paciente = Paciente;
Paciente.TAMANHO_MINIMO_NOME = 3;
Paciente.TAMANHO_MAXIMO_NOME = 40;
//# sourceMappingURL=paciente.entity.js.map