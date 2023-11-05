import { Medico } from "../../modules/domain/medico/medico.entity";
import { IMedico } from "../../modules/domain/medico/medico.interface";

export class MedicoMap {
  public static toDomain(medico: Medico): IMedico{
    return {
      // id: medico.id,
      nome: medico.nome,
      CRM: medico.CRM,
      idade: medico.idade,
      endereco: medico.endereco,
      especialidade: medico.especialidade,
      telefone: medico.telefone,
      status: medico.status
    }
  }
}