import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class RecuperarTodosPacientes {
  public async recuperarTodos(req: Request, res: Response){

    try{
      await new PacienteRepository().recoverAll();
      res.status(200);
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const pacientesRecuperados = new RecuperarTodosPacientes().recuperarTodos;
