import { IRespository } from "@shared/repository/interfacce.repo";
import { pacienteDB } from "../../database/schema";
import { Paciente } from "../../domain/paciente/paciente.entity";

export class PacienteRepository implements IRespository<Paciente>{

  recoverByID(UUID: string): Promise<Paciente | null> {
    throw new Error("Method not implemented.");
  }
  async recoverAll(): Promise<Paciente[]> {
    const pacientesDB = await pacienteDB.find(); 
    
  }
  exist(UUID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  insert(entity: Paciente): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(UUID: string, entity: Paciente): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(UUID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}