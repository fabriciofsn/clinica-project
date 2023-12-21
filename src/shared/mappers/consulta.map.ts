import { IConsulta, ToMongoSaveConsulta } from "@modules/consulta/consulta.interface";

export class ConsultaMap {
  public static toMongo(consulta: IConsulta): ToMongoSaveConsulta{
    return {
      id: consulta.id,
      paciente: consulta.paciente,
      medico: consulta.medico,
      status_da_consulta: consulta.status_da_consulta,
      status_do_pagamento: consulta.status_do_pagamento,
      metodo_do_pagamento: consulta.metodo_do_pagamento,
      valor: consulta.valor,
      data: consulta.data,
    }
  }
}