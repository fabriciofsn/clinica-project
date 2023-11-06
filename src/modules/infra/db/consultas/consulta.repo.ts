import { Consulta } from "@modules/consulta/consulta.entity";
import { IConsulta } from "@modules/consulta/consulta.interface";
import { consultaDB } from "@modules/database/schema";
import { IRespository } from "@shared/repository/interfacce.repo";

export class ConsultaRepository implements IRespository<Consulta>{
  async recoverByID(UUID: string): Promise<Consulta | null> {
    const consultaRecuperada = await consultaDB.findOne({id: UUID});
    throw new Error("Method not implemented.");
  }
  recoverAll(): Promise<Consulta[]> {
    throw new Error("Method not implemented.");
  }
  exist(UUID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  insert(entity: Consulta): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(UUID: string, entity: Consulta): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(UUID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}