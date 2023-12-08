"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_connection_1 = require("./modules/database/database.connection");
const paciente_entity_1 = require("./modules/domain/paciente/paciente.entity");
const schema_1 = require("./modules/database/schema");
const medico_interface_1 = require("./modules/domain/medico/medico.interface");
const medico_entity_1 = require("./modules/domain/medico/medico.entity");
const consulta_interface_1 = require("./modules/consulta/consulta.interface");
const consulta_entity_1 = require("./modules/consulta/consulta.entity");
const paciente_map_1 = require("./shared/mappers/paciente.map");
const medico_map_1 = require("./shared/mappers/medico.map");
const envio_sms_1 = require("@modules/services/envio.sms");
const endereco = {
    estado: 'sergipe', cidade: 'tobias', rua: 'Rua B',
    cep: '49300-000', bairro: 'centro', numero: '680'
};
const pessoa = {
    nome: 'Marta Rianzeira',
    CPF: '95045678944',
    endereco,
    idade: 20,
    telefone: '79854545474'
};
const paciente = paciente_entity_1.Paciente.createNewPaciente(pessoa);
(0, database_connection_1.databaseConnection)();
const novoPaciente = new schema_1.pacienteDB({
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
});
const enderecoMedico = {
    estado: 'fundo do mar', cidade: 'Fenda do biquini', rua: 'street C',
    cep: '54865-7894', bairro: 'centro', numero: '001'
};
const medico = {
    nome: 'Patrick Star',
    idade: 45,
    CRM: '058978/US',
    especialidade: 'Ortopedista',
    endereco: enderecoMedico,
    telefone: '79988888888',
    status: medico_interface_1.StatusMedico.ATIVO
};
// novoPaciente.save().then(() => console.log('Paciente Cadastrado'));
const novoMedico = medico_entity_1.Medico.createNewMedico(medico);
const medicoOnSave = new schema_1.medicoDB({
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
    status: medico_interface_1.StatusMedico.ATIVO,
    especialidade: novoMedico.especialidade
});
// medicoOnSave.save().then(() => console.log('Médico salvo no banco'));
async function findPaciente() {
    const pacienteRecuperado = await schema_1.pacienteDB.findOne({
        id: '35e27e38-9837-4145-805b-654235cbc58f'
    });
    const medicoRecuperado = await schema_1.medicoDB.findOne({
        id: '23822a26-88cc-4ae6-9932-3f3505d047d3'
    });
    const medicos = await schema_1.pacienteDB.find();
    if (pacienteRecuperado && medicoRecuperado) {
        const paciente = {
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
        };
        const medico = {
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
        };
        const pacienteCriado = paciente_entity_1.Paciente.createNewPaciente(paciente);
        const medicoCriado = medico_entity_1.Medico.createNewMedico(medico);
        const consulta = {
            paciente: pacienteCriado,
            medico: medicoCriado,
            data: new Date(),
            valor: 250.00,
            paymentStatus: consulta_interface_1.paymentStatus.CONFIRMADO,
            paymentMethod: consulta_interface_1.paymentMethod.CARTÃO_DE_CREDITO,
            statusConsulta: consulta_interface_1.statusConsulta.AGENDADA
        };
        const marcarConsulta = consulta_entity_1.Consulta.marcarConsulta(consulta);
        const consultaSave = new schema_1.consultaDB({
            id: marcarConsulta.id,
            paciente: paciente_map_1.PacienteMap.toMongo(marcarConsulta.paciente),
            medico: medico_map_1.MedicoMap.toMongo(marcarConsulta.medico),
            data: marcarConsulta.data,
            valor: marcarConsulta.valor,
            status_do_pagamento: marcarConsulta.paymentStatus,
            status_da_consulta: marcarConsulta.statusConsulta,
            metodo_de_pagamento: marcarConsulta.paymentMethod,
        });
        // console.log(MedicoMap.toMongo(marcarConsulta.medico))
        // consultaSave.save().then(() => console.log('Consulta Agendada!'));
        const pessoaUpdate = {
            nome: 'Rian Marteiro de Marta',
            CPF: '70243512544',
            endereco,
            idade: 18,
            telefone: '79996557845'
        };
        const pacienteUpdate = paciente_entity_1.Paciente.createNewPaciente(pessoaUpdate);
        // const atualizar = await new PacienteRepository()
        // .update('85425be5-d630-4d15-881a-3ead43015ae6', PacienteMap.toDomain(pacienteUpdate));
        // console.log(atualizar);
        // const consultaRec = await new ConsultaRepository().recoverAll();
        // console.log(consultaRec);
        console.log(await new envio_sms_1.EnvioSMS().consultas());
    }
}
findPaciente();
//# sourceMappingURL=index.js.map