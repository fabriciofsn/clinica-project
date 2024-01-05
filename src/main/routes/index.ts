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
import { consultasRecuperadas } from "./consultas/consulta.recall";
import { consultaUpdate } from "./consultas/consulta.update";
import { deletarConsulta } from "./consultas/consulta.delete";
import { AuthService } from "@modules/user/authService/AuthService";
import { login } from "@modules/user/login/Login";

export const router: Router = Router();

router.get('/', homepage);
router.post('/cadastrar/paciente',AuthService.authenticateToken,pacienteRoute);
router.get('/paciente/:id', AuthService.authenticateToken, recuperarPacientePorId);
router.get('/pacientes', AuthService.authenticateToken, pacientesRecuperados);
router.put('/paciente/atualizar/:id', AuthService.authenticateToken, atualizarPaciente);
router.get('/deletar/paciente/:id', AuthService.authenticateToken, deletePaciente);

router.post('/cadastrar/medico', AuthService.authenticateToken, medicoCadastrado);
router.get('/medico/:id', AuthService.authenticateToken, recuperarMedicoPorId);
router.get('/medicos', AuthService.authenticateToken, recuperarMedicos);
router.put('/medico/atualizar/:id', AuthService.authenticateToken, updatedMedico);
router.post('/medico/deletar/:id',AuthService.authenticateToken, medicoDeletado);

router.post('/agendar/consulta', AuthService.authenticateToken, agendarConsulta);
router.get('/consulta/:id', AuthService.authenticateToken, recuperarConsulta);
router.get('/consultas', AuthService.authenticateToken, consultasRecuperadas);
router.put('/consulta/:id', AuthService.authenticateToken, consultaUpdate);
router.get('/consulta/deletar/:id', AuthService.authenticateToken,deletarConsulta);

router.post('/login', login);
