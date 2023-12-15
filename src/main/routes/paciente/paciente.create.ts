import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";
import { StatusCodes } from "http-status-codes";

class CreatePaciente {
  public async cadastrarPaciente(req: Request, res: Response){
    let {nome, CPF,idade,telefone, endereco: {
      estado,
      cidade,
      bairro,
      numero,
      cep,
      rua
    }}: IPaciente = req.body;

    const paciente: Paciente = Paciente.createNewPaciente({
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

    try{

      const checkIfExist = await new PacienteRepository().exist(paciente.CPF);

      if(checkIfExist) throw new useCasesExceptions.PacienteJaCadastrado();

      await new PacienteRepository().insert(paciente);
      res.status(200);
    }catch(e: any){
      res.status(StatusCodes.EXPECTATION_FAILED).json({error: e.message});
    }
  }
}

export const pacienteRoute = new CreatePaciente().cadastrarPaciente;
