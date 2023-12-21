import { Entity } from "@shared/entity/entity";
import { IMedico } from "../domain/medico/medico.interface";
import { IPaciente } from "../domain/paciente/paciente.interface";
import { consultaExceptions } from "./consulta.exception";
import { IConsulta, paymentMethod, paymentStatus, statusConsulta } from "./consulta.interface";

export class Consulta extends Entity<Consulta> implements IConsulta{
  private _paciente: IPaciente;
  private _medico: IMedico;
  private _data: Date;
  private _valor: number;
  private _status_do_pagamento: paymentStatus;
  private _metodo_do_pagamento: paymentMethod;
  private _status_da_consulta: statusConsulta;
  
  
  public get paciente(): IPaciente {
    return this._paciente;
  }
  private set paciente(paciente: IPaciente) {
    this._paciente = paciente;
  }

  public get medico(): IMedico {
    return this._medico;
  }
  private set medico(medico: IMedico) {
    this._medico = medico;
  }

   public get data(): Date {
    return this._data;
  }
  private set data(data: Date) {
    this._data = data;
  }

   public get valor(): number {
    return this._valor;
  }
  private set valor(valor: number) {
    if(valor < 0){
      throw new consultaExceptions.ValorInválido();
    }
    this._valor = valor;
  }

  public get status_do_pagamento(): paymentStatus {
    return this._status_do_pagamento;
  }
  private set status_do_pagamento(paymentStatus: paymentStatus) {
    this._status_do_pagamento = paymentStatus;
  }

  public get metodo_do_pagamento(): paymentMethod {
    return this._metodo_do_pagamento;
  }
  private set metodo_do_pagamento(paymentMethod: paymentMethod) {
    this._metodo_do_pagamento = paymentMethod;
  }

  public get status_da_consulta(): statusConsulta {
    return this._status_da_consulta;
  }
  private set status_da_consulta(statusConsulta: statusConsulta) {
    this._status_da_consulta = statusConsulta;
  }

  private constructor(dados: IConsulta){
    super(dados.id);
    this.paciente = dados.paciente;
    this.medico = dados.medico;
    this.valor = dados.valor;
    this.data = dados.data;
    this.metodo_do_pagamento = dados.metodo_do_pagamento;
    this.status_da_consulta = dados.status_da_consulta;
    this.status_do_pagamento = dados.status_do_pagamento;
  }

  public static marcarConsulta(dados: IConsulta): Consulta{
    return new Consulta(dados);
  } 

}