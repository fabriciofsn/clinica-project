import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class RecuperarTodosMedicos{
  public async recuperarTodos(req: Request, res: Response){
    try{  

      const medicos = await new MedicoRepository().recoverAll();
      const medicosDTO = medicos.map(medico =>{
        return {
          id: medico.id,
          nome: medico.nome,
          idade: medico.idade,
          CRM: medico.CRM,
          endereco: medico.endereco,
          especialidade: medico.especialidade,
          status: medico.status,
          telefone: medico.telefone,
        }
      })
      res.status(200).json({medicosDTO});
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const recuperarMedicos = new RecuperarTodosMedicos().recuperarTodos;
