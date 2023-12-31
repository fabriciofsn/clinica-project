import { IRespository } from "@shared/repository/interfacce.repo";
import { pacienteDB } from "../../../database/schema";
import { Paciente } from "../../../domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";

export class PacienteRepository implements IRespository<IPaciente>{

  async recoverByID(id: string): Promise<IPaciente | null> {
    const paciente = await pacienteDB.findOne({id: id});
    
    if(paciente){
    const fromMongoToObject: IPaciente = {
      id: paciente.id,
      nome: paciente.nome,
      CPF: paciente.CPF,
      endereco: {
        estado: paciente.endereco[0].estado,
        cidade: paciente.endereco[0].cidade,
        cep: paciente.endereco[0].cep,
        rua: paciente.endereco[0].rua,
        bairro: paciente.endereco[0].bairro,
        numero: paciente.endereco[0].numero
      },
      idade: paciente.idade,
      telefone: paciente.telefone
      } 
      
    return fromMongoToObject;  
    }
    return null;
  }


  async recoverAll(): Promise<Paciente[]> {
    const pacientesDB = await pacienteDB.find();
    
    return pacientesDB.map(paciente =>{
      let fromMongoToObject: IPaciente = {
        id: paciente.id,
        nome: paciente.nome,
        idade: paciente.idade,
        endereco: {
          estado: paciente.endereco[0].estado,
          cidade: paciente.endereco[0].cidade,
          cep: paciente.endereco[0].cep,
          rua: paciente.endereco[0].rua,
          bairro: paciente.endereco[0].bairro,
          numero: paciente.endereco[0].numero
        },
        CPF: paciente.CPF,
        telefone: paciente.telefone
      } 
      return Paciente.createNewPaciente(fromMongoToObject);
    })
  }
  
  async exist(id: string): Promise<boolean> {
    const paciente = await pacienteDB.findOne({id: id});
    if(paciente) return true;
    return false;
  }
  async insert(paciente: Paciente): Promise<boolean> {
    const insertPaciente = await pacienteDB.create({
      id: paciente.id,
      nome: paciente.nome,
      idade: paciente.idade,
      telefone: paciente.telefone,
      CPF: paciente.CPF,
      endereco: [{
        estado: paciente.endereco.estado,
        cidade: paciente.endereco.cidade,
        rua: paciente.endereco.rua,
        bairro: paciente.endereco.bairro,
        numero: paciente.endereco.numero,
        cep: paciente.endereco.cep
      }]
    });
    if(insertPaciente) return true;
    return false;
  }

  async update(id: string, paciente: IPaciente): Promise<boolean> {
    const pacienteUpdate = await pacienteDB.updateOne({id}, paciente, {new: true}).exec();

    if(pacienteUpdate) return true;
    return false;
  }

  async delete(UUID: string): Promise<boolean> {
    const deleteRow = await pacienteDB.deleteOne({id: UUID});
    if(deleteRow) return true;
    return false;
  }

}