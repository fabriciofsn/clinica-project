import { databaseConnection } from "./modules/database/database.connection";
import { Paciente } from "./modules/domain/paciente/paciente.entity";
import { IEndereco, IPaciente } from "./modules/domain/paciente/paciente.interface";
import { medicoDB, pacienteDB,consultaDB } from "./modules/database/schema";
import { IMedico, StatusMedico } from "./modules/domain/medico/medico.interface";
import { Medico } from "./modules/domain/medico/medico.entity";
import { IConsulta, paymentMethod, paymentStatus, statusConsulta } from "./modules/consulta/consulta.interface";
import { Consulta } from "./modules/consulta/consulta.entity";
import { PacienteMap } from "./shared/mappers/paciente.map";
import { MedicoMap } from "./shared/mappers/medico.map";


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
  estado: 'Flórida',cidade:'Orlando', rua: 'street C',
  cep: '85479-9090',bairro: 'centro', numero: '224'
}

const medico: IMedico = {
  nome: 'Steve',
  idade: 85,
  CRM: '125476/US',
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
  idade: novoMedico.idade,
  status: StatusMedico.ATIVO,
  especialidade: novoMedico.especialidade
})

// medicoOnSave.save().then(() => console.log('Médico saldo no banco'));

async function findPaciente() {
  const pacienteRecuperado = await pacienteDB.findOne({
    id: 'e6a39303-9979-4eb0-b966-1a0b1f26c8c5'
  });
  const medicoRecuperado = await medicoDB.findOne({
    id: 'e8778770-034f-4621-8b05-e5ebe10f4ddc'
  });
 
  if(pacienteRecuperado && medicoRecuperado){
    const paciente: IPaciente = {
      id: pacienteRecuperado.id,
      nome: pacienteRecuperado.nome,
      CPF: pacienteRecuperado.CPF,
      endereco: {
        estado: pacienteRecuperado.endereco[0].estado,
        cidade: pacienteRecuperado.endereco[0].cidade,
        rua: pacienteRecuperado.endereco[0].rua,
        bairro: pacienteRecuperado.endereco[0].bairro,
        cep: pacienteRecuperado.endereco[0].cep,
        numero: pacienteRecuperado.endereco[0].numero
      },
      idade: pacienteRecuperado.idade,
      telefone: pacienteRecuperado.telefone
    }

    const medico: IMedico = {
      id: medicoRecuperado.id,
      nome: medicoRecuperado.nome,
      CRM: medicoRecuperado.CRM,
      endereco: {
        estado: medicoRecuperado.endereco[0].estado,
        cidade: medicoRecuperado.endereco[0].cidade,
        rua: medicoRecuperado.endereco[0].rua,
        bairro: medicoRecuperado.endereco[0].bairro,
        cep: medicoRecuperado.endereco[0].cep,
        numero: medicoRecuperado.endereco[0].numero
      },
      idade: medicoRecuperado.idade,
      especialidade: 'Pedriata',
      telefone: medicoRecuperado.telefone,
      status: StatusMedico.ATIVO
    }

    const pacienteCriado = Paciente.createNewPaciente(paciente);
    const medicoCriado = Medico.createNewMedico(medico);
    
    const consulta: IConsulta = {
      paciente: PacienteMap.toDomain(pacienteCriado),
      medico: MedicoMap.toDomain(medicoCriado),
      data: new Date(),
      valor: 250.00,
      paymentStatus: paymentStatus.CONFIRMADO,
      paymentMethod: paymentMethod.CARTÃO_DE_CREDITO,
      statusConsulta: statusConsulta.AGENDADA
    }

    const marcarConsulta = Consulta.marcarConsulta(consulta);

    const consultaSave = new consultaDB({
      id: marcarConsulta.id,
      paciente: marcarConsulta.paciente.id,
      nome_paciente: marcarConsulta.paciente.nome,
      medico: marcarConsulta.medico.id,
      nome_medico: marcarConsulta.medico.nome,
      data: marcarConsulta.data,
      valor: marcarConsulta.valor,
      status_do_pagamento: marcarConsulta.paymentStatus,
      status_da_consulta: marcarConsulta.statusConsulta,
      metodo_de_pagamento: marcarConsulta.paymentMethod,
    })

    consultaSave.save().then(() => console.log('Consulta Agendada!'));
  }
}
findPaciente();