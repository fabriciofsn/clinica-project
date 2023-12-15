import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request,Response } from "express";

class DeletePaciente{
  public async delete(req: Request, res: Response){
    let {id} = req.params;

    try{
      const deleted = await new PacienteRepository().delete(id);
      
      res.send(deleted);
    }catch(e){
      throw e;
    }
  }
}

export const deletePaciente = new DeletePaciente().delete;
