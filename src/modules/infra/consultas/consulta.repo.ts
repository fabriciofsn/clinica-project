import { Consulta } from "@modules/consulta/consulta.entity";
import { IRespository } from "@shared/repository/interfacce.repo";

export class ConsultaRepository implements IRespository<Consulta>{
  recoverByID(UUID: string): Promise<Consulta | null> {
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