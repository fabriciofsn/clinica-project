import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";

class CreatePaciente {
  public async cadastrarPaciente(req: Request, res: Response){
    let {nome,CPF,idade,telefone, endereco: {
      estado,
      cidade,
      bairro,
      numero,
      cep,
      rua
    }}: IPaciente = req.body;

    const paciente: Paciente = Paciente.createNewPaciente({
      nome: nome.trim(),
      CPF: CPF.trim(),
      idade: idade,
      telefone: telefone.trim(),
      endereco: {
        estado: estado.trim(),
        cidade: cidade.trim(),
        bairro: bairro.trim(),
        numero: numero.trim(),
        cep: cep.trim(),
        rua: rua.trim()
      },
    })

    try{

      const checkIfExist = await new PacienteRepository().exist(paciente.CPF);

      if(checkIfExist) throw new useCasesExceptions.PacienteJaCadastrado();

      const pacienteCadastrado = await new PacienteRepository().insert(paciente);
      res.status(200).json({pacienteCadastrado});
    }catch(e: any){
      res.status(404).json({error: e.message});
    }
  }
}

export const pacienteRoute = new CreatePaciente().cadastrarPaciente;
