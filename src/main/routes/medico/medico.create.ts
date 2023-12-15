import { Medico } from "@modules/domain/medico/medico.entity";
import { IMedico } from "@modules/domain/medico/medico.interface";
import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";
import { StatusCodes } from "http-status-codes";
import { MedicoMap } from "@shared/mappers/medico.map";

class CreateMedico {
  public async cadastrarMedico(req: Request, res: Response){
    let {nome,CRM,especialidade,endereco:{
      estado,cidade,rua,cep,bairro,numero
    },idade,status,telefone}: IMedico = req.body;

    const medico: IMedico = {
      nome,
      CRM,
      especialidade,
      endereco:{
        estado,
        cidade,
        rua,
        cep,
        bairro,
        numero
      },
      idade,
      status,
      telefone
    }

    const medicoCreate = Medico.createNewMedico(medico);
    const mongoToDB = MedicoMap.toMongo(medicoCreate);
    try{
      const checkIfExist = await new MedicoRepository().exist(mongoToDB.CRM);

      if(checkIfExist) throw new useCasesExceptions.MedicoJaCadastrado();
  
      await new MedicoRepository().insert(mongoToDB);
      res.status(200).json({medico: mongoToDB});
    }catch(e: any){
      res.status(StatusCodes.EXPECTATION_FAILED).json({error: e.message});
    }
  }
}

export const medicoCadastrado = new CreateMedico().cadastrarMedico;
