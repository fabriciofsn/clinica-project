import { Router } from "express";
import { pacienteRoute } from "./paciente/paciente.route";

export const router: Router = Router();

router.post('/cadastrar/paciente',pacienteRoute);
