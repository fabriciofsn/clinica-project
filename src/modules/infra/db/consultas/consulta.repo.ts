import { Consulta } from "@modules/consulta/consulta.entity";
import { IConsulta } from "@modules/consulta/consulta.interface";
import { consultaDB } from "@modules/database/schema";
import { IRespository } from "@shared/repository/interfacce.repo";
import { resolveEnumFromMongo } from "./status.medico.conulta";

export class ConsultaRepository implements IRespository<Consulta>{
  async recoverByID(UUID: string): Promise<Consulta | null> {
    const consultaRecuperada = await consultaDB.findOne({id: UUID});

    if(consultaRecuperada && consultaRecuperada.medico && consultaRecuperada.medico.endereco && consultaRecuperada.paciente && consultaRecuperada.paciente.endereco){
      const consulta: IConsulta = {
        id: consultaRecuperada.id,
        paciente: {
          id: consultaRecuperada.paciente?.id,
          nome: consultaRecuperada.paciente.nome,
          idade: consultaRecuperada.paciente.idade,
          endereco: {
            estado: consultaRecuperada.paciente.endereco.estado,
            cidade: consultaRecuperada.paciente.endereco.cidade,
            cep: consultaRecuperada.paciente.endereco.cep,
            rua: consultaRecuperada.paciente.endereco.rua,
            bairro: consultaRecuperada.paciente.endereco.bairro,
            numero: consultaRecuperada.paciente.endereco.numero
          },
          CPF: consultaRecuperada.paciente.CPF,
          telefone: consultaRecuperada.paciente.telefone
        },
        medico: {
          id: consultaRecuperada.medico.id,
          nome: consultaRecuperada.medico.nome,
          idade: consultaRecuperada.medico.idade,
          especialidade: consultaRecuperada.medico.especialidade,
          CRM: consultaRecuperada.medico.CRM,
          endereco: {
            estado: consultaRecuperada.medico.endereco.estado,
            cidade: consultaRecuperada.medico.endereco.cidade,
            cep: consultaRecuperada.medico.endereco.cep,
            rua: consultaRecuperada.medico.endereco.rua,
            bairro: consultaRecuperada.medico.endereco.bairro,
            numero: consultaRecuperada.medico.endereco.numero
          },
          telefone: consultaRecuperada.medico.telefone,
          status: resolveEnumFromMongo.fromMongoToStatus(consultaRecuperada.medico.status)
        },
        data: consultaRecuperada.data,
        valor: consultaRecuperada.valor,
        paymentStatus: resolveEnumFromMongo.fromMongoToPayment(consultaRecuperada.status_do_pagamento),
        statusConsulta: resolveEnumFromMongo.fromMongoToStatusConsulta(consultaRecuperada.status_da_consulta),
        paymentMethod: resolveEnumFromMongo.fromMongoToPaymentMethod(consultaRecuperada.metodo_de_pagamento),
      }
      return Consulta.marcarConsulta(consulta);
    }
    return null;
  }
  recoverAll(): Promise<Consulta[]> {
    throw new Error("Method not implemented.");
  }
  async exist(UUID: string): Promise<boolean> {
    const consultaRecuperada = await consultaDB.findOne({id: UUID});
    if(consultaRecuperada) return true;
    return false;
  }
  async insert(entity: Consulta): Promise<boolean> {
    const consultaSalva = await consultaDB.create(entity);
    if(consultaSalva) return true;
    return false;
  }
  async update(UUID: string, consulta: Consulta): Promise<boolean> {
    const consultaAtualizada = await consultaDB.updateOne({id: UUID}, consulta);
    if(consultaAtualizada) return true;
    return false;
  }
  async delete(UUID: string): Promise<boolean> {
    const consultaDeletada = await consultaDB.findOne({id: UUID});
    if(consultaDeletada) return true;
    return false;
  }

}