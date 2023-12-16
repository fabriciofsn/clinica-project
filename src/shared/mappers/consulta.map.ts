import { IConsulta } from "@modules/consulta/consulta.interface";

export class ConsultaMap {
  public static toMongo(consulta: IConsulta): IConsulta{
    return {
      id: consulta.id,
      paciente: consulta.paciente,
      medico: consulta.medico,
      statusConsulta: consulta.statusConsulta,
      paymentStatus: consulta.paymentStatus,
      paymentMethod: consulta.paymentMethod,
      valor: consulta.valor,
      data: consulta.data,
    }
  }
}