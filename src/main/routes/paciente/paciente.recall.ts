import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class RecuperarTodosPacientes {
  public async recuperarTodos(req: Request, res: Response){

    try{
      const pacientes = await new PacienteRepository().recoverAll();
      const pacientesDTO = pacientes.map(paciente => {
        return {
          id: paciente.id,
          nome: paciente.nome,
          CPF: paciente.CPF,
          endereco: paciente.endereco,
          idade: paciente.idade,
          telefone: paciente.telefone
        }
      });
      res.status(200).json(pacientesDTO);
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const pacientesRecuperados = new RecuperarTodosPacientes().recuperarTodos;
