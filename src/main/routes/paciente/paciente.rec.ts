import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";

class RecuperarPacientePorID {
  public async recuperarPorId(req: Request, res: Response){
    let {id} = req.body;

    try{
      let paciente = await new PacienteRepository().recoverByID(id);
      res.json({paciente: paciente});
    }catch(e){
      console.log(`There was an error ${e}`);
    }
  }
}

export const recuperarPacientePorId = new RecuperarPacientePorID().recuperarPorId;
