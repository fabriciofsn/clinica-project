import { Medico } from "../domain/medico/medico.entity";
import { IMedico } from "../domain/medico/medico.interface";
import { Paciente } from "../domain/paciente/paciente.entity";
import { IPaciente } from "../domain/paciente/paciente.interface";

export enum paymentStatus {
  CONFIRMADO = 'CONFIRMADO',
  PENDENTE = 'PENDENTE'
}

export enum paymentMethod {
  CARTÃO_DE_CREDITO = 'CARTÃO DE CRÉDITO',
  CARTÃO_DE_DEBITO = 'CARTÃO DE DÉBITO',
  PIX = 'PIX',
  EM_DINHEIRO = 'EM DINHEIRO',
}

export enum statusConsulta {
  AGENDADA = 'AGENDADA',
  CANCELADA = 'CANCELADA'
}

export interface IConsulta {
  id?: string;
  paciente: IPaciente;
  medico: IMedico;
  data: Date;
  valor: number;
  paymentStatus: paymentStatus;
  paymentMethod: paymentMethod;
  statusConsulta: statusConsulta;
}