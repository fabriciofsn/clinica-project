"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteMap = void 0;
class PacienteMap {
    static toDomain(paciente) {
        return {
            nome: paciente.nome,
            CPF: paciente.CPF,
            endereco: paciente.endereco,
            idade: paciente.idade,
            telefone: paciente.telefone,
        };
    }
    static toMongo(paciente) {
        return {
            id: paciente.id,
            nome: paciente.nome,
            idade: paciente.idade,
            CPF: paciente.CPF,
            endereco: {
                estado: paciente.endereco.estado,
                cidade: paciente.endereco.cidade,
                bairro: paciente.endereco.bairro,
                rua: paciente.endereco.rua,
                numero: paciente.endereco.numero,
                cep: paciente.endereco.cep
            },
            telefone: paciente.telefone
        };
    }
}
exports.PacienteMap = PacienteMap;
//# sourceMappingURL=paciente.map.js.map