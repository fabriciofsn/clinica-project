import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { Request, Response } from "express";

class PacienteRoute {
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
      await new PacienteRepository().insert(paciente);
      res.redirect('/');
    }catch(e){
      console.log(`There was an error ${e}`);
    }
  }
}

export const pacienteRoute = new PacienteRoute().cadastrarPaciente;