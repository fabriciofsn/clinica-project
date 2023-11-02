import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Paciente } from "../domain/paciente/paciente.entity";
import { Medico } from "../domain/medico/medico.entity";
import { paymentMethod, paymentStatus, statusConsulta } from "../consulta/consulta.interface";
import { StatusMedico } from "../domain/medico/medico.interface";


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
  status: {type: String, enum: StatusMedico, required: true},
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

const consultaSchema = new Schema({
  id: {type: String, require: true},
  paciente: {type: mongoose.Schema.ObjectId, ref: 'Paciente', required: true},
  medico: {type: mongoose.Schema.ObjectId, ref: 'Medico', required: true},
  data: {type: Date, required: true},
  valor: {type: Number, required: true},
  status_do_pagamento: {type: String, enum: paymentStatus, required: true},
  metodo_de_pagamento: {type: String, enum: paymentMethod, required: true},
  status_da_consulta: {type: String, enum: statusConsulta, required: true},
  data_de_exclusao: {type: Date, required: false}
})

export const consultaDB = mongoose.model('consultas', consultaSchema);
export const medicoDB = mongoose.model('medicos', medicoSchema);
export const pacienteDB = mongoose.model('pacientes', pacienteSchema);
