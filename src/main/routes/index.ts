import { Router } from "express";
import { pacienteRoute } from "./paciente/paciente.route";
import { homepage } from "./home/home.route";
import { recuperarPacientePorId } from "./paciente/paciente.rec";
import { pacientesRecuperados } from "./paciente/paciente.recall";
import { atualizarPaciente } from "./paciente/paciente.update";

export const router: Router = Router();

router.get('/', homepage);
router.post('/cadastrar/paciente',pacienteRoute);
router.post('/paciente/id', recuperarPacientePorId);
router.get('/pacientes/recuperados', pacientesRecuperados);
router.post('/paciente/atualizar/:id', atualizarPaciente);