import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { useCasesExceptions } from "../exception/usecase.exception";

class RecuperarMedicoPorId{
  public async recuperarPorId(req: Request, res: Response){
    let {id} = req.params;

    try{
      const checkIfExist = await new MedicoRepository().exist(id);
      if(!checkIfExist) throw new useCasesExceptions.MedicoInexistente();

      const medico = await new MedicoRepository().recoverByID(id);
      res.status(200).json(medico);
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const recuperarMedicoPorId = new RecuperarMedicoPorId().recuperarPorId;
