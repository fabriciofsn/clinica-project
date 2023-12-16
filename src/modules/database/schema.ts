import mongoose from "mongoose";
import { Schema } from "mongoose";
import { paymentMethod, paymentStatus, statusConsulta } from "../consulta/consulta.interface";
import { StatusMedico } from "../domain/medico/medico.interface";


const medicoSchema = new Schema({
  id: {type: String, required: true},
  nome: {type: String, required: true},
  CRM: {type: String, required: true, unique: true},
  especialidade: { type: String, required: true },
  endereco: [{
    estado: {type: String, required: true},
    cidade: {type: String, required: true},
    rua: {type: String, required: true},
    cep: {type: String, required: true},
    bairro: {type: String, required: true},
    numero: {type: String, required: true} 
  }],
  idade: {type: Number, required: true},
  status: {type: String, enum: Object.values(StatusMedico), required: true},
  telefone: {type: String, required: true}
})

const pacienteSchema = new Schema({
  id: {type: String, required: true},
  nome: {type: String, required: true},
  CPF: {type: String, required: true, unique: true},
  endereco: [{
    estado: {type: String, required: true},
    cidade: {type: String, required: true},
    rua: {type: String, required: true},
    cep: {type: String, required: true},
    bairro: {type: String, required: true},
    numero: {type: String, required: true} 
  }],
  idade: {type: Number, required: true},
  telefone: {type: String, required: true}
})

const consultaSchema = new Schema({
  id: { type: String, required: true },
  paciente:{type: String, required: true},
  medico: {type: String, required: true},
  data: { type: Date, required: true },
  valor: { type: Number, required: true },
  paymentStatus: { type: String, enum: paymentStatus, required: true },
  paymentMethod: { type: String, enum: paymentMethod, required: true },
  statusConsulta: { type: String, enum: statusConsulta, required: true },
  data_de_exclusao: { type: Date, required: false }
});

export const consultaDB = mongoose.model('consultas', consultaSchema);
export const medicoDB = mongoose.model('medicos', medicoSchema);
export const pacienteDB = mongoose.model('pacientes', pacienteSchema);
