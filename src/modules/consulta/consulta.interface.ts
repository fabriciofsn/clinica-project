import { Medico } from "../domain/medico/medico.entity";
import { Paciente } from "../domain/paciente/paciente.entity";

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
  ATIVA = 'ATIVA',
  CANCELADA = 'CANCELADA'
}

export interface IConsulta {
  id?: string;
  paciente: Paciente;
  medico: Medico;
  data: Date;
  valor: number;
  paymentStatus: paymentStatus;
  paymentMethod: paymentMethod;
  statusConsulta: statusConsulta;
}