"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaRepository = void 0;
const consulta_entity_1 = require("@modules/consulta/consulta.entity");
const schema_1 = require("@modules/database/schema");
const status_medico_conulta_1 = require("./status.medico.conulta");
class ConsultaRepository {
    async recoverByID(UUID) {
        const consultaRecuperada = await schema_1.consultaDB.findOne({ id: UUID });
        if (consultaRecuperada && consultaRecuperada.medico && consultaRecuperada.medico.endereco && consultaRecuperada.paciente && consultaRecuperada.paciente.endereco) {
            const consulta = {
                id: consultaRecuperada.id,
                paciente: {
                    id: consultaRecuperada.paciente?.id,
                    nome: consultaRecuperada.paciente.nome,
                    idade: consultaRecuperada.paciente.idade,
                    endereco: {
                        estado: consultaRecuperada.paciente.endereco.estado,
                        cidade: consultaRecuperada.paciente.endereco.cidade,
                        cep: consultaRecuperada.paciente.endereco.cep,
                        rua: consultaRecuperada.paciente.endereco.rua,
                        bairro: consultaRecuperada.paciente.endereco.bairro,
                        numero: consultaRecuperada.paciente.endereco.numero
                    },
                    CPF: consultaRecuperada.paciente.CPF,
                    telefone: consultaRecuperada.paciente.telefone
                },
                medico: {
                    id: consultaRecuperada.medico.id,
                    nome: consultaRecuperada.medico.nome,
                    idade: consultaRecuperada.medico.idade,
                    especialidade: consultaRecuperada.medico.especialidade,
                    CRM: consultaRecuperada.medico.CRM,
                    endereco: {
                        estado: consultaRecuperada.medico.endereco.estado,
                        cidade: consultaRecuperada.medico.endereco.cidade,
                        cep: consultaRecuperada.medico.endereco.cep,
                        rua: consultaRecuperada.medico.endereco.rua,
                        bairro: consultaRecuperada.medico.endereco.bairro,
                        numero: consultaRecuperada.medico.endereco.numero
                    },
                    telefone: consultaRecuperada.medico.telefone,
                    status: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToStatus(consultaRecuperada.medico.status)
                },
                data: consultaRecuperada.data,
                valor: consultaRecuperada.valor,
                paymentStatus: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToPayment(consultaRecuperada.status_do_pagamento),
                statusConsulta: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToStatusConsulta(consultaRecuperada.status_da_consulta),
                paymentMethod: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToPaymentMethod(consultaRecuperada.metodo_de_pagamento),
            };
            return consulta_entity_1.Consulta.marcarConsulta(consulta);
        }
        return null;
    }
    async recoverAll() {
        const consulta = await schema_1.consultaDB.find();
        let arr = [];
        const consultasRecuperadas = consulta.map(consultas => {
            if (consultas.paciente && consultas.paciente.endereco && consultas.paciente && consultas.medico && consultas.medico.endereco) {
                const consulta = {
                    id: consultas.id,
                    paciente: {
                        id: consultas.paciente.id,
                        nome: consultas.paciente.nome,
                        CPF: consultas.paciente.CPF,
                        telefone: consultas.paciente.telefone,
                        idade: consultas.paciente.idade,
                        endereco: {
                            estado: consultas.paciente.endereco.estado,
                            cidade: consultas.paciente.endereco.cidade,
                            rua: consultas.paciente.endereco.rua,
                            bairro: consultas.paciente.endereco.bairro,
                            numero: consultas.paciente.endereco.numero,
                            cep: consultas.paciente.endereco.cep
                        }
                    },
                    medico: {
                        id: consultas.medico.id,
                        nome: consultas.medico.nome,
                        CRM: consultas.medico.CRM,
                        idade: consultas.medico.idade,
                        status: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToStatus(consultas.medico.status),
                        telefone: consultas.medico.telefone,
                        especialidade: consultas.medico.especialidade,
                        endereco: {
                            estado: consultas.medico.endereco.estado,
                            cidade: consultas.medico.endereco.cidade,
                            rua: consultas.medico.endereco.rua,
                            bairro: consultas.medico.endereco.bairro,
                            numero: consultas.medico.endereco.numero,
                            cep: consultas.medico.endereco.cep
                        }
                    },
                    data: consultas.data,
                    valor: consultas.valor,
                    paymentStatus: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToPayment(consultas.status_do_pagamento),
                    statusConsulta: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToStatusConsulta(consultas.status_da_consulta),
                    paymentMethod: status_medico_conulta_1.resolveEnumFromMongo.fromMongoToPaymentMethod(consultas.metodo_de_pagamento),
                };
                arr.push(consulta);
            }
        });
        return arr;
    }
    async exist(UUID) {
        const consultaRecuperada = await schema_1.consultaDB.findOne({ id: UUID });
        if (consultaRecuperada)
            return true;
        return false;
    }
    async insert(entity) {
        const consultaSalva = await schema_1.consultaDB.create(entity);
        if (consultaSalva)
            return true;
        return false;
    }
    async update(UUID, consulta) {
        const consultaAtualizada = await schema_1.consultaDB.updateOne({ id: UUID }, consulta);
        if (consultaAtualizada)
            return true;
        return false;
    }
    async delete(UUID) {
        const consultaDeletada = await schema_1.consultaDB.findOneAndUpdate({ id: UUID }, {
            data_de_exclusao: new Date()
        });
        if (consultaDeletada)
            return true;
        return false;
    }
}
exports.ConsultaRepository = ConsultaRepository;
//# sourceMappingURL=consulta.repo.js.map