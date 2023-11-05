import { medicoDB } from "@modules/database/schema";
import { Medico } from "@modules/domain/medico/medico.entity";
import { IMedico } from "@modules/domain/medico/medico.interface";
import { IRespository } from "@shared/repository/interfacce.repo";

export class MedicoRepository implements IRespository<Medico>{
  async recoverByID(UUID: string): Promise<Medico | null> {
    const medicoRecuperado = await medicoDB.findOne({id: UUID})
    if(medicoRecuperado){
      const fromMongoToObject: IMedico = {
        id: medicoRecuperado.id,
        nome: medicoRecuperado.nome,
        CRM: medicoRecuperado.CRM,
        endereco: {
          estado: medicoRecuperado.endereco[0].estado,
          cidade: medicoRecuperado.endereco[0].cidade,
          bairro: medicoRecuperado.endereco[0].bairro,
          rua: medicoRecuperado.endereco[0].rua,
          numero: medicoRecuperado.endereco[0].numero,
          cep: medicoRecuperado.endereco[0].cep
        },
        idade: medicoRecuperado.idade,
        telefone: medicoRecuperado.telefone,
        status: medicoRecuperado.status,
        especialidade: medicoRecuperado.especialidade,
      } 

    return Medico.createNewMedico(fromMongoToObject);  
    }
    return null;
  }
  async recoverAll(): Promise<Medico[]> {
    const medicosRecuperados = await medicoDB.find();

    return medicosRecuperados.map(medicos =>{
      const medico: IMedico = {
        id: medicos.id,
        nome: medicos.nome,
        CRM: medicos.CRM,
        endereco: {
          estado: medicos.endereco[0].estado,
          cidade: medicos.endereco[0].cidade,
          bairro: medicos.endereco[0].bairro,
          rua: medicos.endereco[0].rua,
          numero: medicos.endereco[0].numero,
          cep: medicos.endereco[0].cep
        },
        especialidade: medicos.especialidade,
        idade: medicos.idade,
        status: medicos.status,
        telefone: medicos.telefone
      }

      return Medico.createNewMedico(medico);
    })
  }
  async exist(UUID: string): Promise<boolean> {
    const medico = await medicoDB.findOne({id: UUID});
    if(medico) return true;
    return false;
  }
  async insert(medico: Medico): Promise<boolean> {
    const insertMedico = await medicoDB.create(medico);
    if(insertMedico) return true;
    return false;
  }
  async update(UUID: string, medico: Medico): Promise<boolean> {
    const updateMedico = await medicoDB.updateOne({id: UUID}, medico);

    if(updateMedico) return true;
    return false;
  }
  async delete(UUID: string): Promise<boolean> {
    const deleteMedico = await medicoDB.deleteOne({id: UUID});
    
    if(deleteMedico) return true;
    return false;
  }

}