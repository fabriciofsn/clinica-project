import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { fromMongoToPaciente } from "@shared/mongoMappers/fromMongoToPaciente";
import { Request, Response } from "express";

class RecuperarTodosPacientes {
  public async recuperarTodos(req: Request, res: Response){

    try{
      let pacientesRecuperados = await new PacienteRepository().recoverAll();
      res.json({pacientes: pacientesRecuperados});
    }catch(e){
      console.log(`There was an error ${e}`);
    }
  }
}

export const pacientesRecuperados = new RecuperarTodosPacientes().recuperarTodos;
