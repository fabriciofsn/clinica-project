import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { Paciente } from "@modules/domain/paciente/paciente.entity";


export class PacienteMap {
  public static toDomain(paciente: Paciente): IPaciente{
    return {
      nome: paciente.nome,
      CPF: paciente.CPF,
      endereco: paciente.endereco,
      idade: paciente.idade,
      telefone: paciente.telefone,
    }
  }

  public static toMongo(paciente: IPaciente): IPaciente{
    return {
      id: paciente.id,
      nome: paciente.nome,
      idade: paciente.idade,
      CPF: paciente.CPF,
      endereco: paciente.endereco,
      telefone: paciente.telefone
    }
  }
}