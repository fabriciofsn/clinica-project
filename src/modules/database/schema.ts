import mongoose from "mongoose";
import { Schema } from "mongoose";

const medicoSchema = new Schema({
  id: {type: String, required: true},
  nome: {type: String, required: true},
  CRM: {type: String, required: true},
  especialidade: { type: String },
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


const pacienteSchema = new Schema({
  id: {type: String, required: true},
  nome: {type: String, required: true},
  CPF: {type: String, required: true},
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


export const medicoDB = mongoose.model('medicos', medicoSchema);
export const pacienteDB = mongoose.model('pacientes', pacienteSchema);