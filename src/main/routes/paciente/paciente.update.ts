import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";
import { PacienteMap } from "@shared/mappers/paciente.map";
import { StatusCodes } from "http-status-codes";

class PacienteUpdate {
  public async updatePaciente(req: Request, res: Response){
     let {nome, CPF, idade, telefone, endereco: {
      estado,
      cidade,
      bairro,
      numero,
      cep,
      rua
    }}: IPaciente = req.body;
    let {id} = req.params;
    const paciente: Paciente = Paciente.createNewPaciente({
      id: id,
      nome: nome,
      CPF: CPF,
      idade: idade,
      telefone: telefone,
      endereco: {
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        numero: numero,
        cep: cep,
        rua: rua
      },
    })

    let pacienteMapper = PacienteMap.toMongo(paciente);
    
    try{
      
      const buscarPaciente = await new PacienteRepository().exist(id);
      if(!buscarPaciente) throw new useCasesExceptions.PacienteInexistente();

      await new PacienteRepository().update(id, pacienteMapper);
      res.status(200);
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }

  }
}

export const atualizarPaciente = new PacienteUpdate().updatePaciente;
