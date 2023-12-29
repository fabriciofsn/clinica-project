import { Consulta } from "@modules/consulta/consulta.entity";
import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import { MedicoRepository } from "@modules/infra/db/medico/medico.repo";
import { PacienteRepository } from "@modules/infra/db/paciente/paciente.repo";
import { ConsultaMap } from "@shared/mappers/consulta.map";
import { Request, Response } from "express";
import { useCasesExceptions } from "../exception/usecase.exception";
import { PacienteMap } from "@shared/mappers/paciente.map";
import { IPaciente } from "@modules/domain/paciente/paciente.interface";
import { MedicoMap } from "@shared/mappers/medico.map";
import { IMedico } from "@modules/domain/medico/medico.interface";

class AgendarConsulta{
  public async agendarConsulta(req: Request, res: Response){
    let {paciente,medico,data,valor,status_do_pagamento,status_da_consulta,metodo_do_pagamento}  = req.body;

    try{ 
      const existPaciente = await new PacienteRepository().recoverByID(paciente);
      const existMedico = await new MedicoRepository().recoverByID(medico);

      const pacienteMap = PacienteMap.toMongo(existPaciente as IPaciente);
      const medicoMap = MedicoMap.toMongo(existMedico as IMedico);

      if(!existPaciente) throw new useCasesExceptions.PacienteInexistente();
      if(!existMedico) throw new useCasesExceptions.MedicoInexistente();

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
      
      const consultaAgendada = await new ConsultaRepository().insert(consultaMapper);
      res.status(200).json({consulta: consultaAgendada});
    }catch(e: any){
      res.status(404).json({error: e.message});
    }
  }
}

export const agendarConsulta = new AgendarConsulta().agendarConsulta;
