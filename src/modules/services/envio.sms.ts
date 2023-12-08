
import { ConsultaRepository } from "@modules/infra/db/consultas/consulta.repo";
import axios from "axios";
require('dotenv').config();

export class EnvioSMS{

  private _message: string = 'Oál%20Sua%20Consulta%20é%20amanhã';

  public async consultas(): Promise<void>{
    const findConsultas = await new ConsultaRepository().recoverAll();
    
    findConsultas.map((consulta) => {
      try{
        axios({
          method: 'get',
          url: `https://api.smsdev.com.br/v1/send?key=${process.env.API_KEY}&type=9&number=${consulta.paciente.telefone}&msg=${this._message}`,
        }).then((response) => {
          if(response.status == 200){
            console.log('SMS Enviado Com Sucesso!')
          }
        })
      }catch(e){
        console.log(`There was an Error ${e}`);
      }
    })
  }
}