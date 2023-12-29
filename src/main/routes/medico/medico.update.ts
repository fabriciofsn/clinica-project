import { Medico } from "@modules/domain/medico/medico.entity";
import { IMedico } from "@modules/domain/medico/medico.interface";
import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { MedicoMap } from "@shared/mappers/medico.map";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { useCasesExceptions } from "../exception/usecase.exception";
import { medicoCadastrado } from "./medico.create";

class UpdateMedico{
  public async updateMedico(req: Request, res: Response){
    let {nome,CRM,idade,telefone,especialidade,status, endereco:{
      estado,cidade,rua,bairro,cep,numero
    }}: IMedico = req.body;

    let {id} = req.params;

    const medicoEntity: IMedico = Medico.createNewMedico({
      id, nome, CRM, idade, telefone, especialidade, status, endereco:{
        estado,cidade,rua,bairro,cep,numero
      }
    })

    const medicoMap = MedicoMap.toMongo(medicoEntity);

    try{  

      const medicoExist = await new MedicoRepository().exist(id);
      if(!medicoExist) throw new useCasesExceptions.MedicoInexistente();

      const medicoUpdated = await new MedicoRepository().update(id,medicoMap);
      res.status(200).json({medicoUpdated});
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }

  }
}

export const updatedMedico = new UpdateMedico().updateMedico;
