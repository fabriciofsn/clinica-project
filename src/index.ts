import { Paciente } from "./modules/domain/paciente/paciente.entity";
import { IEndereco, IPaciente } from "./modules/domain/paciente/paciente.interface";

const endereco: IEndereco = {
  estado: 'sergipe',cidade:'tobias', rua: 'Rua A',
  cep: '49300-000',bairro: 'centro', numero: '200'
}

const pessoa: IPaciente = {
  nome: 'chiquinho',
  CPF: '00000000000',
  endereco,
  idade: 15,
  telefone: '79996557845'
}

const paciente = Paciente.createNewPaciente(pessoa);
console.log(paciente);