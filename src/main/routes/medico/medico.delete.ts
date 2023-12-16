import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { useCasesExceptions } from "../exception/usecase.exception";

class DeleteMedico {
  public async deleteMedico(req: Request, res: Response){
    let {id} = req.params;

    try{  
      const medicoExist = new MedicoRepository().exist(id);
      if(!medicoExist) throw new useCasesExceptions.MedicoInexistente();

      const deletedMedico = new MedicoRepository().delete(id);
      res.status(200).json({deletedMedico});
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const medicoDeletado = new DeleteMedico().deleteMedico;
