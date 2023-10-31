export interface IEndereco{
  estado: string;
  cidade: string;
  rua: string;
  cep: string;
  bairro: string;
  numero: string;
}

export interface IPaciente{
  nome: string;
  CPF: string;
  endereco: IEndereco;
  idade: number;
  telefone: string;
}