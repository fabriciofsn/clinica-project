import { databaseConnection } from "./modules/database/database.connection";
import { Paciente } from "./modules/domain/paciente/paciente.entity";
import { IEndereco, IPaciente } from "./modules/domain/paciente/paciente.interface";
import { medicoDB, pacienteDB, consultaDB } from "./modules/database/schema";
import { IMedico, StatusMedico } from "./modules/domain/medico/medico.interface";
import { Medico } from "./modules/domain/medico/medico.entity";
import { IConsulta, paymentMethod, paymentStatus, statusConsulta } from "./modules/consulta/consulta.interface";
import { Consulta } from "./modules/consulta/consulta.entity";
import { PacienteMap } from "./shared/mappers/paciente.map";
import { MedicoMap } from "./shared/mappers/medico.map";
import { EnvioSMS } from "@modules/services/envio.sms";

const endereco: IEndereco = {
  estado: 'sergipe',cidade:'tobias', rua: 'Rua B',
  cep: '49300-000',bairro: 'centro', numero: '680'
}

const pessoa: IPaciente = {
  nome: 'Marta Rianzeira',
  CPF: '95045678944',
  endereco,
  idade: 20,
  telefone: '79854545474'
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
  estado: 'fundo do mar',cidade:'Fenda do biquini', rua: 'street C',
  cep: '54865-7894',bairro: 'centro', numero: '001'
}

const medico: IMedico = {
  nome: 'Patrick Star',
  idade: 45,
  CRM: '058978/US',
  especialidade: 'Ortopedista',
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

// medicoOnSave.save().then(() => console.log('Médico salvo no banco'));

async function findPaciente() {
  const pacienteRecuperado = await pacienteDB.findOne({
    id: '35e27e38-9837-4145-805b-654235cbc58f'
  });
  const medicoRecuperado = await medicoDB.findOne({
    id: '23822a26-88cc-4ae6-9932-3f3505d047d3'
  });
 
  const medicos = await pacienteDB.find();
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
      especialidade: medicoRecuperado.especialidade,
      telefone: medicoRecuperado.telefone,
      status: medicoRecuperado.status
    }

    const pacienteCriado = Paciente.createNewPaciente(paciente);
    const medicoCriado = Medico.createNewMedico(medico);
    
    const consulta: IConsulta = {
      paciente: pacienteCriado,
      medico: medicoCriado,
      data: new Date(),
      valor: 250.00,
      paymentStatus: paymentStatus.CONFIRMADO,
      paymentMethod: paymentMethod.CARTÃO_DE_CREDITO,
      statusConsulta: statusConsulta.AGENDADA
    }

    const marcarConsulta = Consulta.marcarConsulta(consulta);
    const consultaSave = new consultaDB({
      id: marcarConsulta.id,
      paciente: PacienteMap.toMongo(marcarConsulta.paciente),
      medico: MedicoMap.toMongo(marcarConsulta.medico),
      data: marcarConsulta.data,
      valor: marcarConsulta.valor,
      status_do_pagamento: marcarConsulta.paymentStatus,
      status_da_consulta: marcarConsulta.statusConsulta,
      metodo_de_pagamento: marcarConsulta.paymentMethod,
    })
    // console.log(MedicoMap.toMongo(marcarConsulta.medico))
    
    // consultaSave.save().then(() => console.log('Consulta Agendada!'));
   
      const pessoaUpdate: IPaciente = {
      nome: 'Rian Marteiro de Marta',
      CPF: '70243512544',
      endereco,
      idade: 18,
      telefone: '79996557845'
}
    const pacienteUpdate = Paciente.createNewPaciente(pessoaUpdate); 

    // const atualizar = await new PacienteRepository()
    // .update('85425be5-d630-4d15-881a-3ead43015ae6', PacienteMap.toDomain(pacienteUpdate));
    // console.log(atualizar);
    // const consultaRec = await new ConsultaRepository().recoverAll();
    // console.log(consultaRec);
    console.log(await new EnvioSMS().consultas())
  }
}
findPaciente();
