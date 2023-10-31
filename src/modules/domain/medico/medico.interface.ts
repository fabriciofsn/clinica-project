import { IEndereco } from "../paciente/paciente.interface";

export enum StatusMedico {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  AFASTADO = 'AFASTADO',
  FERIAS = 'FERIAS',
  LICENCA = 'LICENÇA'
}

export interface IMedico {
  nome: string;
  idade: number;
  CRM: string;
  endereco: IEndereco;
  telefone: string;
  status: StatusMedico;
}