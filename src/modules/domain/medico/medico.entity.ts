import { IEndereco } from "../paciente/paciente.interface";
import { IMedico, StatusMedico } from "./medico.interface";
import {Exceptions} from '../paciente/paciente.exception';
import { CRMinvalido } from "./medico.exception";
import { Entity } from "@shared/entity/entity";

export class Medico extends Entity<Medico> implements IMedico{
  private _nome: string;
  private _idade: number;
  private _CRM: string; 
  private _endereco: IEndereco;
  private _telefone: string;
  private _status: StatusMedico;
  private _especialidade: string;

  public static readonly TAMANHO_MINIMO_NOME = 3;
  public static readonly TAMANHO_MAXIMO_NOME = 40;

  public get nome(): string {
    return this._nome;
  }
  private set nome(nome: string) {
    if(nome.length < Medico.TAMANHO_MINIMO_NOME){
      throw new Exceptions.NomeInvalido();
    }
    if(nome.length > Medico.TAMANHO_MAXIMO_NOME){
      throw new Exceptions.NomeInvalido();
    }
    this._nome = nome;
  }

  public get idade(): number {
    return this._idade;
  }
  private set idade(idade: number) {
    if(idade < 0){
      throw new Exceptions.IdadeInvalida();
    }
    this._idade = idade;
  }

  public get CRM(): string {
    return this._CRM;
  }
  private set CRM(CRM: string) {
    const regexp: RegExp = /^\d{6}\/[A-Za-z]{2}$/;
    if(!regexp.test(CRM)){
      throw new CRMinvalido();
    }
    this._CRM = CRM;
  }

  public get endereco(): IEndereco {
    return this._endereco;
  }
  private set endereco(endereco: IEndereco) {
    this._endereco = endereco;
  }

  public get telefone(): string {
    return this._telefone;
  }
  private set telefone(telefone: string) {
    this._telefone = telefone;
  }

  public get status(): StatusMedico {
    return this._status;
  }
  private set status(value: StatusMedico) {
    this._status = value;
  }

  public get especialidade(): string {
    return this._especialidade;
  }
  private set especialidade(value: string) {
    this._especialidade = value;
  }

  private constructor(dados: IMedico){
    super(dados.id);
    this.nome = dados.nome;
    this.CRM = dados.CRM;
    this.idade = dados.idade;
    this.telefone = dados.telefone;
    this.endereco = dados.endereco;
    this.status = dados.status;
    this.especialidade = dados.especialidade;
  }
  
  public static createNewMedico(dados: IMedico): Medico{
    return new Medico(dados);
  }
}