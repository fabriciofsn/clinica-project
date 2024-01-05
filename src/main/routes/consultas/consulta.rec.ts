import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { useCasesExceptions } from "../exception/usecase.exception";
import { ConsultaMap } from "@shared/mappers/consulta.map";

class RecuperarConsultaPorId{
  public async recuperarConsulta(req: Request, res: Response){
    let {id} = req.params;

    try{
      const consulta = await new ConsultaRepository().recoverByID(id);
      if(!consulta) throw new useCasesExceptions.ConsultaNaoExiste();
      const consultaMapper = ConsultaMap.toMongo(consulta);
      res.status(200).json({consulta: consultaMapper});
    }catch(e: any){
      res.status(StatusCodes.BAD_REQUEST).json({error: e.message});
    }
  }
}

export const recuperarConsulta = new RecuperarConsultaPorId().recuperarConsulta;
