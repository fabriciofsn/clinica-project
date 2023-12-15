import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class RecuperarPacientePorID {
  public async recuperarPorId(req: Request, res: Response){
    let {id} = req.body;

    try{
      await new PacienteRepository().recoverByID(id);
      res.status(200);
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const recuperarPacientePorId = new RecuperarPacientePorID().recuperarPorId;
