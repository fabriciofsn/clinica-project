import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import { Request, Response } from "express";

class RecuperarTodasConsultas {
  public async recuperarConsultas(req: Request, res: Response){
    
    try{
      const consultas = await new ConsultaRepository().recoverAll();
      res.status(200).json({consultas: consultas});
    }catch(e: any){
      res.status(404).json({error: e.message});
    }
  }
}

export const consultasRecuperadas = new RecuperarTodasConsultas().recuperarConsultas;
