"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoRepository = void 0;
const schema_1 = require("@modules/database/schema");
const medico_entity_1 = require("@modules/domain/medico/medico.entity");
class MedicoRepository {
    async recoverByID(UUID) {
        const medicoRecuperado = await schema_1.medicoDB.findOne({ id: UUID });
        if (medicoRecuperado) {
            const fromMongoToObject = {
                id: medicoRecuperado.id,
                nome: medicoRecuperado.nome,
                CRM: medicoRecuperado.CRM,
                endereco: {
                    estado: medicoRecuperado.endereco[0].estado,
                    cidade: medicoRecuperado.endereco[0].cidade,
                    bairro: medicoRecuperado.endereco[0].bairro,
                    rua: medicoRecuperado.endereco[0].rua,
                    numero: medicoRecuperado.endereco[0].numero,
                    cep: medicoRecuperado.endereco[0].cep
                },
                idade: medicoRecuperado.idade,
                telefone: medicoRecuperado.telefone,
                status: medicoRecuperado.status,
                especialidade: medicoRecuperado.especialidade,
            };
            return medico_entity_1.Medico.createNewMedico(fromMongoToObject);
        }
        return null;
    }
    async recoverAll() {
        const medicosRecuperados = await schema_1.medicoDB.find();
        return medicosRecuperados.map(medicos => {
            const medico = {
                id: medicos.id,
                nome: medicos.nome,
                CRM: medicos.CRM,
                endereco: {
                    estado: medicos.endereco[0].estado,
                    cidade: medicos.endereco[0].cidade,
                    bairro: medicos.endereco[0].bairro,
                    rua: medicos.endereco[0].rua,
                    numero: medicos.endereco[0].numero,
                    cep: medicos.endereco[0].cep
                },
                especialidade: medicos.especialidade,
                idade: medicos.idade,
                status: medicos.status,
                telefone: medicos.telefone
            };
            return medico_entity_1.Medico.createNewMedico(medico);
        });
    }
    async exist(UUID) {
        const medico = await schema_1.medicoDB.findOne({ id: UUID });
        if (medico)
            return true;
        return false;
    }
    async insert(medico) {
        const insertMedico = await schema_1.medicoDB.create(medico);
        if (insertMedico)
            return true;
        return false;
    }
    async update(UUID, medico) {
        const updateMedico = await schema_1.medicoDB.updateOne({ id: UUID }, medico);
        if (updateMedico)
            return true;
        return false;
    }
    async delete(UUID) {
        const deleteMedico = await schema_1.medicoDB.deleteOne({ id: UUID });
        if (deleteMedico)
            return true;
        return false;
    }
}
exports.MedicoRepository = MedicoRepository;
//# sourceMappingURL=medico.repo.js.map