import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";

class RecuperarPacientePorID {
  public async recuperarPorId(req: Request, res: Response){
    let {id} = req.params;
  
    try{
      const pacienteRecuperado = await new PacienteRepository().recoverByID(id);
      res.status(200).json({pacienteRecuperado});
    }catch(e: any){
      res.status(404).json({error: e.message});
    }
  }
}

export const recuperarPacientePorId = new RecuperarPacientePorID().recuperarPorId;
