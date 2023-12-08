"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoMap = void 0;
class MedicoMap {
    static toDomain(medico) {
        return {
            nome: medico.nome,
            CRM: medico.CRM,
            idade: medico.idade,
            endereco: medico.endereco,
            especialidade: medico.especialidade,
            telefone: medico.telefone,
            status: medico.status
        };
    }
    static toMongo(medico) {
        return {
            id: medico.id,
            nome: medico.nome,
            idade: medico.idade,
            CRM: medico.CRM,
            endereco: medico.endereco,
            telefone: medico.telefone,
            status: medico.status,
            especialidade: medico.especialidade,
        };
    }
}
exports.MedicoMap = MedicoMap;
//# sourceMappingURL=medico.map.js.map