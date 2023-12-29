import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { useCasesExceptions } from "../exception/usecase.exception";
import { IMedico } from "@modules/domain/medico/medico.interface";

class RecuperarMedicoPorId{
  public async recuperarPorId(req: Request, res: Response){
    let {id} = req.params;

    try{
      const checkIfExist = await new MedicoRepository().exist(id);
      if(!checkIfExist) throw new useCasesExceptions.MedicoInexistente();

      const medico = await new MedicoRepository().recoverByID(id);
      if(medico){
        const medicoDTO: IMedico = {
        id: medico.id,
        nome: medico.nome,
        CRM: medico.CRM,
        idade: medico.idade,
        especialidade: medico.especialidade,
        status: medico.status,
        telefone: medico.telefone,
        endereco:{
          estado: medico.endereco.estado,
          cidade: medico.endereco.cidade,
          rua: medico.endereco.rua,
          bairro: medico.endereco.bairro,
          numero: medico.endereco.numero,
          cep: medico.endereco.cep
        }
        }
      res.status(200).json(medicoDTO);
      }
      
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const recuperarMedicoPorId = new RecuperarMedicoPorId().recuperarPorId;
