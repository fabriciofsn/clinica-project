import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";
import { PacienteMap } from "@shared/mappers/paciente.map";

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

      let update = await new PacienteRepository().update(id, pacienteMapper);
      res.send(update);
    }catch(e){
      throw e;
    }

  }
}


export const atualizarPaciente = new PacienteUpdate().updatePaciente;
