import { IRespository } from "@shared/repository/interfacce.repo";
import { pacienteDB } from "../../database/schema";
import { Paciente } from "../../domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";

export class PacienteRepository implements IRespository<Paciente>{

  async recoverByID(UUID: string): Promise<Paciente | null> {
    const paciente = await pacienteDB.findById({id:UUID});
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

    return Paciente.createNewPaciente(fromMongoToObject);  
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
  exist(UUID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  insert(entity: Paciente): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(UUID: string, entity: Partial<Paciente>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(UUID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}