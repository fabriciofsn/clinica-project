"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacienteRoute = void 0;
const schema_1 = require("@modules/database/schema");
const paciente_entity_1 = require("@modules/domain/paciente/paciente.entity");
class PacienteRoute {
    async cadastrarPaciente(req, res) {
        let { nome, CPF, idade, telefone, endereco: { estado, cidade, bairro, numero, cep, rua } } = req.body;
        const paciente = paciente_entity_1.Paciente.createNewPaciente({
            nome: nome,
            CPF: CPF,
            idade: idade,
            telefone: telefone,
            endereco: {
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                numero: numero,
                cep: cep,
                rua: rua
            },
        });
        try {
            const pacientes = new schema_1.pacienteDB({
                id: paciente.id,
                nome: paciente.nome,
                CPF: paciente.CPF,
                idade: paciente.idade,
                telefone: paciente.telefone,
                endereco: [{
                        estado: paciente.endereco.estado,
                        cidade: paciente.endereco.cidade,
                        bairro: paciente.endereco.bairro,
                        numero: paciente.endereco.numero,
                        cep: paciente.endereco.cep,
                        rua: paciente.endereco.rua
                    }]
            });
            pacientes.save().then(() => console.log('Paciente Salvo'));
            res.redirect('/');
        }
        catch (e) {
            console.log(`There was an error ${e}`);
        }
    }
}
exports.pacienteRoute = new PacienteRoute().cadastrarPaciente;
//# sourceMappingURL=paciente.route.js.map