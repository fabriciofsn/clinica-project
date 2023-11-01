import { databaseConnection } from "./modules/database/database.connection";
import { Paciente } from "./modules/domain/paciente/paciente.entity";
import { IEndereco, IPaciente } from "./modules/domain/paciente/paciente.interface";
import { medicoDB, pacienteDB } from "./modules/database/schema";

const endereco: IEndereco = {
  estado: 'sergipe',cidade:'tobias', rua: 'Rua A',
  cep: '49300-000',bairro: 'centro', numero: '200'
}

const pessoa: IPaciente = {
  nome: 'XIBETO',
  CPF: '00000000000',
  endereco,
  idade: 99,
  telefone: '79999999999'
}

const paciente = Paciente.createNewPaciente(pessoa);
databaseConnection();
const novoPaciente = new pacienteDB({
  id: paciente.id,
  nome: paciente.nome,
  CPF: paciente.CPF,
  idade: paciente.idade,
  endereco: [{
    estado: paciente.endereco.estado,
    cidade: paciente.endereco.cidade,
    rua: paciente.endereco.rua,
    cep: paciente.endereco.cep,
    bairro: paciente.endereco.bairro,
    numero: paciente.endereco.numero,

  }],
  telefone: paciente.telefone
})


novoPaciente.save().then(() => console.log('Paciente saldo no banco'));
