import { Router } from "express";
import { pacienteRoute } from "./paciente/paciente.create";
import { homepage } from "./home/home.route";
import { recuperarPacientePorId } from "./paciente/paciente.rec";
import { pacientesRecuperados } from "./paciente/paciente.recall";
import { atualizarPaciente } from "./paciente/paciente.update";
import { deletePaciente } from "./paciente/paciente.delete";
import { medicoCadastrado } from "./medico/medico.create";
import { recuperarMedicoPorId } from "./medico/medico.rec";
import { recuperarMedicos } from "./medico/medico.recall";
import { updatedMedico } from "./medico/medico.update";
import { medicoDeletado } from "./medico/medico.delete";
import { agendarConsulta } from "./consultas/consulta.create";
import { recuperarConsulta } from "./consultas/consulta.rec";

export const router: Router = Router();

router.get('/', homepage);
router.post('/cadastrar/paciente',pacienteRoute);
router.post('/paciente/id', recuperarPacientePorId);
router.get('/pacientes', pacientesRecuperados);
router.post('/paciente/atualizar/:id', atualizarPaciente);
router.post('/deletar/paciente/:id', deletePaciente);

router.post('/cadastrar/medico', medicoCadastrado);
router.post('/medico/:id', recuperarMedicoPorId);
router.get('/medicos', recuperarMedicos);
router.post('/medico/atualizar/:id', updatedMedico);
router.post('/medico/deletar/:id', medicoDeletado);

router.post('/agendar/consulta', agendarConsulta);
router.post('/consulta/:id', recuperarConsulta);
