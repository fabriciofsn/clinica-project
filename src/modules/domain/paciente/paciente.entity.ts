import { Exceptions } from "./paciente.exception";
import { IEndereco, IPaciente } from "./paciente.interface";

export class Paciente implements IPaciente{
  private _nome: string;
  private _CPF: string;
  private _endereco: IEndereco;  
  private _idade: number;
  private _telefone: string;
  

  public static readonly TAMANHO_MINIMO_NOME = 3;
  public static readonly TAMANHO_MAXIMO_NOME = 40;

  public get nome(): string {
    return this._nome;
  }
  private set nome(nome: string) {
    if(nome.length < Paciente.TAMANHO_MINIMO_NOME){
      throw new Exceptions.NomeInvalido();
    }
    if(nome.length > Paciente.TAMANHO_MAXIMO_NOME){
      throw new Exceptions.NomeInvalido();
    }
    this._nome = nome;
  }

   public get CPF(): string {
    return this._CPF;
  }
  private set CPF(CPF: string) {
    const regexp: RegExp = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
    if(!regexp.test(CPF)){
      throw Error();
    }
    this._CPF = CPF;
  }

  public get endereco(): IEndereco {
    return this._endereco;
  }
  private set endereco(endereco: IEndereco) {
    this._endereco = endereco;
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

  public get telefone(): string {
    return this._telefone;
  }
  private set telefone(telefone: string) {
    const regexp: RegExp = /^\d{2}\-?\d{4}\-?\d{4}$/;
    if(!regexp.test(telefone)){
      throw new Exceptions.TelefoneInvalido();
    }
    this._telefone = telefone;
  }

  private constructor(dados: IPaciente){
    this.nome = dados.nome;
    this.CPF = dados.CPF;
    this.endereco = dados.endereco;
    this.telefone = dados.telefone;
    this.idade = dados.idade;
  }

  public static createNewPaciente(dados: IPaciente): Paciente{
    return new Paciente(dados);
  }

}