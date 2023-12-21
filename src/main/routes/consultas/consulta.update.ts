import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";
import { ConsultaMap } from "@shared/mappers/consulta.map";
import { PacienteMap } from "@shared/mappers/paciente.map";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { MedicoMap } from "@shared/mappers/medico.map";
import { IMedico } from "@modules/domain/medico/medico.interface";
import { Consulta } from "@modules/consulta/consulta.entity";

class UpdateConsulta {
  public async updateConsulta(req: Request, res: Response){
    const {id} = req.params;
    const {paciente,medico,valor,status_do_pagamento,status_da_consulta,metodo_do_pagamento,data} = req.body;

    try{  
      const existPaciente = await new PacienteRepository().recoverByID(paciente);
      const existMedico = await new MedicoRepository().recoverByID(medico);

      if(!existPaciente) throw new useCasesExceptions.PacienteInexistente();
      if(!existMedico) throw new useCasesExceptions.MedicoInexistente();

      const pacienteMap = PacienteMap.toMongo(existPaciente as IPaciente);
      const medicoMap = MedicoMap.toMongo(existMedico as IMedico);

      const consulta: Consulta = Consulta.marcarConsulta({
        paciente: pacienteMap,
        medico: medicoMap,
        data: data,
        valor: valor,
        status_do_pagamento: status_do_pagamento,
        status_da_consulta: status_da_consulta,
        metodo_do_pagamento: metodo_do_pagamento
      })

      const consultaMapper = ConsultaMap.toMongo(consulta);
      const consultaUpdated = await new ConsultaRepository().update(id, consultaMapper);

      res.status(200).json({consultaUpdated});

    }catch(e: any){
      res.status(404).json({error: e.message});
    }
  }
}

export const consultaUpdate = new UpdateConsulta().updateConsulta;
