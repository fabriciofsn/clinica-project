"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioSMS = void 0;
const consulta_repo_1 = require("@modules/infra/db/consultas/consulta.repo");
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
class EnvioSMS {
    constructor() {
        this._message = 'Olá%20Sua%20Consulta%20é%20amanhã';
    }
    async consultas() {
        const findConsultas = await new consulta_repo_1.ConsultaRepository().recoverAll();
        findConsultas.map((consulta) => {
            try {
                (0, axios_1.default)({
                    method: 'get',
                    url: `https://api.smsdev.com.br/v1/send?key=${process.env.API_KEY}&type=9&number=${consulta.paciente.telefone}&msg=${this._message}`,
                }).then((response) => {
                    if (response.status == 200) {
                        console.log('SMS Enviado Com Sucesso!');
                    }
                });
            }
            catch (e) {
                console.log(`There was an Error ${e}`);
            }
        });
    }
}
exports.EnvioSMS = EnvioSMS;
//# sourceMappingURL=envio.sms.js.map