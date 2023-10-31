import { IEndereco } from "../paciente/paciente.interface";

export interface IMedico {
  nome: string;
  idade: number;
  CRM: string;
  endereco: IEndereco;
  telefone: string;
}