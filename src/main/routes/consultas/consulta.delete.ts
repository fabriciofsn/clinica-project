import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import { Request, Response } from "express";

class DeletarConsulta {
  public async deletarConsulta(req: Request, res: Response){
    let {id} = req.params;

    try{
      let deleteConsulta = await new ConsultaRepository().delete(id);

      res.status(200).json({deleteConsulta});
    }catch(e: any){
      res.status(404).json({error: e.message});
    }
  }
}

export const deletarConsulta = new DeletarConsulta().deletarConsulta;
