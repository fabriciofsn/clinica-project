"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacienteDB = exports.medicoDB = exports.consultaDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const consulta_interface_1 = require("../consulta/consulta.interface");
const medico_interface_1 = require("../domain/medico/medico.interface");
const medicoSchema = new mongoose_2.Schema({
    id: { type: String, required: true },
    nome: { type: String, required: true },
    CRM: { type: String, required: true },
    especialidade: { type: String, required: true },
    endereco: [{
            estado: { type: String, required: true },
            cidade: { type: String, required: true },
            rua: { type: String, required: true },
            cep: { type: String, required: true },
            bairro: { type: String, required: true },
            numero: { type: String, required: true }
        }],
    idade: { type: Number, required: true },
    status: { type: String, enum: Object.values(medico_interface_1.StatusMedico), required: true },
    telefone: { type: String, required: true }
});
const pacienteSchema = new mongoose_2.Schema({
    id: { type: String, required: true },
    nome: { type: String, required: true },
    CPF: { type: String, required: true },
    endereco: [{
            estado: { type: String, required: true },
            cidade: { type: String, required: true },
            rua: { type: String, required: true },
            cep: { type: String, required: true },
            bairro: { type: String, required: true },
            numero: { type: String, required: true }
        }],
    idade: { type: Number, required: true },
    telefone: { type: String, required: true }
});
const consultaSchema = new mongoose_2.Schema({
    id: { type: String, required: true },
    paciente: {
        id: { type: String, required: true },
        nome: { type: String, required: true },
        idade: { type: Number, required: true },
        CPF: { type: String, required: true },
        endereco: {
            estado: { type: String, required: true },
            cidade: { type: String, required: true },
            cep: { type: String, required: true },
            bairro: { type: String, required: true },
            rua: { type: String, required: true },
            numero: { type: String, required: true }
        },
        telefone: { type: String, required: true }
    },
    medico: {
        id: { type: String, required: true },
        nome: { type: String, required: true },
        idade: { type: Number, required: true },
        CRM: { type: String, required: true },
        endereco: {
            estado: { type: String, required: true },
            cidade: { type: String, required: true },
            cep: { type: String, required: true },
            bairro: { type: String, required: true },
            rua: { type: String, required: true },
            numero: { type: String, required: true }
        },
        especialidade: { type: String, required: true },
        status: { type: String, enum: medico_interface_1.StatusMedico, required: true },
        telefone: { type: String, required: true }
    },
    data: { type: Date, required: true },
    valor: { type: Number, required: true },
    status_do_pagamento: { type: String, enum: consulta_interface_1.paymentStatus, required: true },
    metodo_de_pagamento: { type: String, enum: consulta_interface_1.paymentMethod, required: true },
    status_da_consulta: { type: String, enum: consulta_interface_1.statusConsulta, required: true },
    data_de_exclusao: { type: Date, required: false }
});
exports.consultaDB = mongoose_1.default.model('consultas', consultaSchema);
exports.medicoDB = mongoose_1.default.model('medicos', medicoSchema);
exports.pacienteDB = mongoose_1.default.model('pacientes', pacienteSchema);
//# sourceMappingURL=schema.js.map