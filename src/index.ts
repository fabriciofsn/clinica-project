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
import { PacienteRepository } from "@modules/infra/paciente/paciente.repo";
import mongoose from "mongoose";


const endereco: IEndereco = {
  estado: 'sergipe',cidade:'tobias', rua: 'Rua A',
  cep: '49300-000',bairro: 'centro', numero: '200'
}

const pessoa: IPaciente = {
  nome: 'Rian Souza de Gois',
  CPF: '70243512544',
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
  estado: 'Albânia',cidade:'Shkoder', rua: 'street C',
  cep: '85479-9090',bairro: 'centro', numero: '224'
}

const medico: IMedico = {
  nome: 'Patolino Sheldon',
  idade: 35,
  CRM: '058457/US',
  especialidade: 'Dentista',
  endereco: enderecoMedico,
  telefone: '79988888888',
  status: StatusMedico.ATIVO
}

// novoPaciente.save().then(() => console.log('Paciente Cadastrado'));
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
  // const pacienteRecuperado = await pacienteDB.findOne({
  //   id: 'f7eac60a-9349-45b8-88c9-63c513589ef3'
  // });
  // const medicoRecuperado = await medicoDB.findOne({
  //   id: '42f39f3b-bb3c-4a4b-b247-9d35042fa037'
  // });
 
  // const medicos = await pacienteDB.find();
  // if(pacienteRecuperado && medicoRecuperado){
  //   const paciente: IPaciente = {
  //     id: pacienteRecuperado.id,
  //     nome: pacienteRecuperado.nome,
  //     CPF: pacienteRecuperado.CPF,
  //     endereco: {
  //       estado: pacienteRecuperado.endereco[0].estado,
  //       cidade: pacienteRecuperado.endereco[0].cidade,
  //       rua: pacienteRecuperado.endereco[0].rua,
  //       bairro: pacienteRecuperado.endereco[0].bairro,
  //       cep: pacienteRecuperado.endereco[0].cep,
  //       numero: pacienteRecuperado.endereco[0].numero
  //     },
  //     idade: pacienteRecuperado.idade,
  //     telefone: pacienteRecuperado.telefone
  //   }

  //   const medico: IMedico = {
  //     id: medicoRecuperado.id,
  //     nome: medicoRecuperado.nome,
  //     CRM: medicoRecuperado.CRM,
  //     endereco: {
  //       estado: medicoRecuperado.endereco[0].estado,
  //       cidade: medicoRecuperado.endereco[0].cidade,
  //       rua: medicoRecuperado.endereco[0].rua,
  //       bairro: medicoRecuperado.endereco[0].bairro,
  //       cep: medicoRecuperado.endereco[0].cep,
  //       numero: medicoRecuperado.endereco[0].numero
  //     },
  //     idade: medicoRecuperado.idade,
  //     especialidade: 'Pedriata',
  //     telefone: medicoRecuperado.telefone,
  //     status: StatusMedico.ATIVO
  //   }

  //   const pacienteCriado = Paciente.createNewPaciente(paciente);
  //   const medicoCriado = Medico.createNewMedico(medico);
    
  //   const consulta: IConsulta = {
  //     paciente: PacienteMap.toDomain(pacienteCriado),
  //     medico: MedicoMap.toDomain(medicoCriado),
  //     data: new Date(),
  //     valor: 250.00,
  //     paymentStatus: paymentStatus.CONFIRMADO,
  //     paymentMethod: paymentMethod.CARTÃO_DE_CREDITO,
  //     statusConsulta: statusConsulta.AGENDADA
  //   }

  //   const marcarConsulta = Consulta.marcarConsulta(consulta);

  //   const consultaSave = new consultaDB({
  //     id: marcarConsulta.id,
  //     id_paciente: marcarConsulta.paciente.id,
  //     nome_paciente: marcarConsulta.paciente.nome,
  //     id_medico: marcarConsulta.medico.id,
  //     nome_medico: marcarConsulta.medico.nome,
  //     data: marcarConsulta.data,
  //     valor: marcarConsulta.valor,
  //     status_do_pagamento: marcarConsulta.paymentStatus,
  //     status_da_consulta: marcarConsulta.statusConsulta,
  //     metodo_de_pagamento: marcarConsulta.paymentMethod,
  //   })

    // consultaSave.save().then(() => console.log('Consulta Agendada!'));
   
      const pessoaUpdate: IPaciente = {
      nome: 'Rian Marteiro de Marta',
      CPF: '70243512544',
      endereco,
      idade: 18,
      telefone: '79000000009'
}
    const pacienteUpdate = Paciente.createNewPaciente(pessoaUpdate); 

    const atualizar = await new PacienteRepository()
    .update('792433d1-daae-4e12-a59a-1a7b1b2269ea', PacienteMap.toDomain(pacienteUpdate));
    console.log(atualizar);
   
  }

findPaciente();
