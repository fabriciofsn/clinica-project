import { IMedico } from "../domain/medico/medico.interface";
import { IPaciente } from "../domain/paciente/paciente.interface";

export enum paymentStatus {
  CONFIRMADO = 'CONFIRMADO',
  PENDENTE = 'PENDENTE'
}

export enum paymentMethod {
  CARTAO_DE_CREDITO = 'CARTAO DE CREDITO',
  CARTAO_DE_DEBITO = 'CARTAO DE DEBITO',
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


