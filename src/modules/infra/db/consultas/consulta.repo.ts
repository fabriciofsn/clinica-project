import { Consulta } from "@modules/consulta/consulta.entity";
import { IConsulta, ToMongoSaveConsulta, paymentMethod } from "@modules/consulta/consulta.interface";
import { consultaDB } from "@modules/database/schema";
import { IRespository } from "@shared/repository/interfacce.repo";
import { resolveEnumFromMongo } from "./status.medico.conulta";
import { StatusMedico } from "@modules/domain/medico/medico.interface";

export class ConsultaRepository implements IRespository<Consulta>{

  async recoverByID(UUID: string): Promise<Consulta | null> {
    const consultaRecuperada = await consultaDB.findOne({id: UUID});
    console.log(consultaRecuperada?.metodo_do_pagamento)
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
        status_do_pagamento: resolveEnumFromMongo.fromMongoToPayment(consultaRecuperada.status_do_pagamento),
        status_da_consulta: resolveEnumFromMongo.fromMongoToStatusConsulta(consultaRecuperada.status_da_consulta),
        metodo_do_pagamento: consultaRecuperada.metodo_do_pagamento as paymentMethod,
      }
      return Consulta.marcarConsulta(consulta);
    }
    return null;
  }
  
  async recoverAll(): Promise<Consulta[]> {
    const consulta = await consultaDB.find();

    let arr: Array<Consulta> = [];

     const consultasRecuperadas = consulta.map(consultas =>{
      if(consultas.paciente && consultas.paciente.endereco && consultas.paciente && consultas.medico && consultas.medico.endereco){
      const consulta: IConsulta = {
        id: consultas.id,
        paciente: {
          id: consultas.paciente.id,
          nome: consultas.paciente.nome,
          CPF: consultas.paciente.CPF,
          telefone: consultas.paciente.telefone,
          idade: consultas.paciente.idade,
          endereco:{
            estado: consultas.paciente.endereco.estado,
            cidade: consultas.paciente.endereco.cidade,
            rua: consultas.paciente.endereco.rua,
            bairro: consultas.paciente.endereco.bairro,
            numero: consultas.paciente.endereco.numero,
            cep: consultas.paciente.endereco.cep
          }
        },
        medico: {
          id: consultas.medico.id,
          nome: consultas.medico.nome,
          CRM: consultas.medico.CRM,
          idade: consultas.medico.idade,
          status: consultas.medico.status as StatusMedico,
          telefone: consultas.medico.telefone,
          especialidade: consultas.medico.especialidade,
          endereco:{
            estado: consultas.medico.endereco.estado,
            cidade: consultas.medico.endereco.cidade,
            rua: consultas.medico.endereco.rua,
            bairro: consultas.medico.endereco.bairro,
            numero: consultas.medico.endereco.numero,
            cep: consultas.medico.endereco.cep
          }
        },
        data: consultas.data,
        valor: consultas.valor,
        status_do_pagamento: resolveEnumFromMongo.fromMongoToPayment(consultas.status_do_pagamento),
        status_da_consulta: resolveEnumFromMongo.fromMongoToStatusConsulta(consultas.status_da_consulta),
        metodo_do_pagamento: resolveEnumFromMongo.fromMongoToPaymentMethod(consultas.metodo_do_pagamento),
      }
      arr.push(consulta as Consulta);
      }
    })
    return arr;
}

  async exist(UUID: string): Promise<boolean> {
    const consultaRecuperada = await consultaDB.findOne({id: UUID});
    if(consultaRecuperada) return true;
    return false;
  }

  async insert(consulta: IConsulta): Promise<boolean> {
    const consultaSalva = await consultaDB.create(consulta);
    if(consultaSalva) return true;
    return false;
  }
  
  async update(UUID: string, consulta: IConsulta): Promise<boolean> {
    const consultaAtualizada = await consultaDB.updateOne({id: UUID}, consulta);
    if(consultaAtualizada) return true;
    return false;
  }
  
  async delete(UUID: string): Promise<boolean> {
    const consultaDeletada = await consultaDB.findOneAndUpdate({id: UUID}, {
      data_de_exclusao: new Date()
    });
    if(consultaDeletada) return true;
    return false;
  }

}