import { pacienteDB } from "@modules/database/schema";
import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
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
     const pacientes = new pacienteDB({
        id: paciente.id,
        nome: paciente.nome,
        CPF: paciente.CPF,
        idade: paciente.idade,
        telefone: paciente.telefone,
        endereco:[{
          estado: paciente.endereco.estado,
          cidade: paciente.endereco.cidade,
          bairro: paciente.endereco.bairro,
          numero: paciente.endereco.numero,
          cep: paciente.endereco.cep,
          rua: paciente.endereco.rua
        }]
      })
      pacientes.save().then(() => console.log('Paciente Salvo'))
      res.redirect('/');
    }catch(e){
      console.log(`There was an error ${e}`);
    }
  }
}

export const pacienteRoute = new PacienteRoute().cadastrarPaciente;