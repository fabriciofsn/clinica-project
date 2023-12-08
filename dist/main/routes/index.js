"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const paciente_route_1 = require("./paciente/paciente.route");
exports.router = (0, express_1.Router)();
exports.router.post('/cadastrar/paciente', paciente_route_1.pacienteRoute);
//# sourceMappingURL=index.js.map