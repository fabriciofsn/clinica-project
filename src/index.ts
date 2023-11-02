import { databaseConnection } from "./modules/database/database.connection";
import { Paciente } from "./modules/domain/paciente/paciente.entity";
import { IEndereco, IPaciente } from "./modules/domain/paciente/paciente.interface";
import { medicoDB, pacienteDB,consultaDB } from "./modules/database/schema";
import { IMedico, StatusMedico } from "./modules/domain/medico/medico.interface";
import { Medico } from "./modules/domain/medico/medico.entity";

const endereco: IEndereco = {
  estado: 'sergipe',cidade:'tobias', rua: 'Rua A',
  cep: '49300-000',bairro: 'centro', numero: '200'
}

const pessoa: IPaciente = {
  nome: 'Rian',
  CPF: '99999999999',
  endereco,
  idade: 18,
  telefone: '79888888888'
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

const enderecoMedico: IEndereco = {
  estado: 'sergipe',cidade:'tobias', rua: 'Rua A',
  cep: '49300-000',bairro: 'centro', numero: '200'
}

const medico: IMedico = {
  nome: 'Heli',
  idade: 55,
  CRM: '547866SE',
  especialidade: 'Cirurgião',
  endereco: enderecoMedico,
  telefone: '7998585547',
  status: StatusMedico.ATIVO
}

const novoMedico: Medico = Medico.createNewMedico(medico);

const medicoOnSave = new medicoDB({
  id: novoMedico.id,
  nome: novoMedico.nome,
  CRM: novoMedico.CRM,
  endereco: [{
    estado: novoMedico.endereco.estado,
    cidade: novoMedico.endereco.cidade,
    rua: novoMedico.endereco.rua,
    cep: novoMedico.endereco.cep,
    bairro: novoMedico.endereco.bairro,
    numero: novoMedico.endereco.numero
  }],
  telefone: novoMedico.telefone,
  especialidade: novoMedico.especialidade
})

// novoMedico.save().then(() => console.log('Médico saldo no banco'));
