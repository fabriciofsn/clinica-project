import { Router } from "express";
import { pacienteRoute } from "./paciente/paciente.create";
import { homepage } from "./home/home.route";
import { recuperarPacientePorId } from "./paciente/paciente.rec";
import { pacientesRecuperados } from "./paciente/paciente.recall";
import { atualizarPaciente } from "./paciente/paciente.update";
import { deletePaciente } from "./paciente/paciente.delete";

export const router: Router = Router();

router.get('/', homepage);
router.post('/cadastrar/paciente',pacienteRoute);
router.post('/paciente/id', recuperarPacientePorId);
router.get('/pacientes/recuperados', pacientesRecuperados);
router.post('/paciente/atualizar/:id', atualizarPaciente);
router.post('/deletar/paciente/:id', deletePaciente);