import { Entity } from "../../shared/entity/entity";
import { Medico } from "../domain/medico/medico.entity";
import { Paciente } from "../domain/paciente/paciente.entity";
import { consultaExceptions } from "./consulta.exception";
import { IConsulta } from "./consulta.interface";
import { paymentMethod, paymentStatus, statusConsulta } from "./consulta.interface";

export class Consulta extends Entity<Consulta> implements IConsulta{
  private _paciente: Paciente;
  private _medico: Medico;
  private _data: Date;
  private _valor: number;
  private _paymentStatus: paymentStatus;
  private _paymentMethod: paymentMethod;
  private _statusConsulta: statusConsulta;
  
  
  public get paciente(): Paciente {
    return this._paciente;
  }
  private set paciente(paciente: Paciente) {
    this._paciente = paciente;
  }

  public get medico(): Medico {
    return this._medico;
  }
  private set medico(medico: Medico) {
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

  public get paymentStatus(): paymentStatus {
    return this._paymentStatus;
  }
  private set paymentStatus(paymentStatus: paymentStatus) {
    this._paymentStatus = paymentStatus;
  }

  public get paymentMethod(): paymentMethod {
    return this._paymentMethod;
  }
  private set paymentMethod(paymentMethod: paymentMethod) {
    this._paymentMethod = paymentMethod;
  }

  public get statusConsulta(): statusConsulta {
    return this._statusConsulta;
  }
  private set statusConsulta(statusConsulta: statusConsulta) {
    this._statusConsulta = statusConsulta;
  }

  private constructor(dados: IConsulta){
    super(dados.id);
    this.paciente = dados.paciente;
    this.medico = dados.medico;
    this.valor = dados.valor;
    this.data = dados.data;
    this.paymentMethod = dados.paymentMethod;
    this.statusConsulta = dados.statusConsulta;
    this.paymentStatus = dados.paymentStatus;
  }

  public static marcarConsulta(dados: IConsulta): Consulta{
    return new Consulta(dados);
  } 

}