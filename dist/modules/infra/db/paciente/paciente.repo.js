"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteRepository = void 0;
const schema_1 = require("../../../database/schema");
const paciente_entity_1 = require("../../../domain/paciente/paciente.entity");
class PacienteRepository {
    async recoverByID(UUID) {
        const paciente = await schema_1.pacienteDB.findById({ id: UUID });
        if (paciente) {
            const fromMongoToObject = {
                id: paciente.id,
                nome: paciente.nome,
                CPF: paciente.CPF,
                endereco: {
                    estado: paciente.endereco[0].estado,
                    cidade: paciente.endereco[0].cidade,
                    cep: paciente.endereco[0].cep,
                    rua: paciente.endereco[0].rua,
                    bairro: paciente.endereco[0].bairro,
                    numero: paciente.endereco[0].numero
                },
                idade: paciente.idade,
                telefone: paciente.telefone
            };
            return paciente_entity_1.Paciente.createNewPaciente(fromMongoToObject);
        }
        return null;
    }
    async recoverAll() {
        const pacientesDB = await schema_1.pacienteDB.find();
        return pacientesDB.map(paciente => {
            let fromMongoToObject = {
                id: paciente.id,
                nome: paciente.nome,
                idade: paciente.idade,
                endereco: {
                    estado: paciente.endereco[0].estado,
                    cidade: paciente.endereco[0].cidade,
                    cep: paciente.endereco[0].cep,
                    rua: paciente.endereco[0].rua,
                    bairro: paciente.endereco[0].bairro,
                    numero: paciente.endereco[0].numero
                },
                CPF: paciente.CPF,
                telefone: paciente.telefone
            };
            return paciente_entity_1.Paciente.createNewPaciente(fromMongoToObject);
        });
    }
    async exist(UUID) {
        const paciente = await schema_1.pacienteDB.findById({ id: UUID });
        if (paciente)
            return true;
        return false;
    }
    async insert(paciente) {
        const insertPaciente = await schema_1.pacienteDB.create(paciente);
        if (insertPaciente)
            return true;
        return false;
    }
    async update(UUID, paciente) {
        const pacienteUpdate = await schema_1.pacienteDB.updateOne({ id: UUID }, paciente);
        if (pacienteUpdate)
            return true;
        return false;
    }
    async delete(UUID) {
        const deleteRow = await schema_1.pacienteDB.deleteOne({ id: UUID });
        if (deleteRow)
            return true;
        return false;
    }
}
exports.PacienteRepository = PacienteRepository;
//# sourceMappingURL=paciente.repo.js.map