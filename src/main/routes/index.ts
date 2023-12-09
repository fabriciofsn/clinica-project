import { Router } from "express";
import { pacienteRoute } from "./paciente/paciente.route";
import { homepage } from "./home/home.route";

export const router: Router = Router();

router.post('/cadastrar/paciente',pacienteRoute);
router.get('/', homepage);