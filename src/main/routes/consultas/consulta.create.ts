import { Consulta } from "@modules/consulta/consulta.entity";
import { Medico } from "@modules/domain/medico/medico.entity";
import { IMedico } from "@modules/domain/medico/medico.interface";
import { Paciente } from "@modules/domain/paciente/paciente.entity";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import { resolveEnumFromMongo } from "@modules/infra/db/consultas/status.medico.conulta";
import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { ConsultaMap } from "@shared/mappers/consulta.map";
import { MedicoMap } from "@shared/mappers/medico.map";
import { PacienteMap } from "@shared/mappers/paciente.map";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { useCasesExceptions } from "../exception/usecase.exception";

class AgendarConsulta{
  public async agendarConsulta(req: Request, res: Response){
    let {paciente,medico,data,valor,status_do_pagamento,status_da_consulta,metodo_de_pagamento} 
    = req.body;

    try{ 
      const existPaciente = await new PacienteRepository().exist(paciente);
      const existMedico = await new MedicoRepository().exist(medico);

      if(!existPaciente) throw new useCasesExceptions.PacienteInexistente();
      if(!existMedico) throw new useCasesExceptions.MedicoInexistente();

      const consulta: Consulta = Consulta.marcarConsulta({
        paciente: paciente,
        medico: medico,
        data: data,
        valor: valor,
        paymentStatus: resolveEnumFromMongo.fromMongoToPayment(status_do_pagamento),
        statusConsulta: resolveEnumFromMongo.fromMongoToStatusConsulta(status_da_consulta),
        paymentMethod: resolveEnumFromMongo.fromMongoToPaymentMethod(metodo_de_pagamento)
      })

      const consultaMapper = ConsultaMap.toMongo(consulta);

      const consultaAgendada = await new ConsultaRepository().insert(consultaMapper);
      res.status(200).json({consulta: consultaAgendada});
    }catch(e: any){
      res.status(StatusCodes.GATEWAY_TIMEOUT).json({error: e.message});
    }
  }
}

export const agendarConsulta = new AgendarConsulta().agendarConsulta;
