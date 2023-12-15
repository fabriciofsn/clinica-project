import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";

class DeletePaciente{
  public async delete(req: Request, res: Response){
    let {id} = req.params;

    try{
      await new PacienteRepository().delete(id);
      
      res.status(200);
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const deletePaciente = new DeletePaciente().delete;
