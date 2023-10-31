import { IEndereco, IPaciente } from "./paciente.interface";

export class Paciente implements IPaciente{
  private _nome: string;
  private _CPF: string;
  private _endereco: IEndereco;  
  private _idade: number;
  private _telefone: string;
  

  public get nome(): string {
    return this._nome;
  }
  private set nome(nome: string) {
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
  private set endereco(value: IEndereco) {
    this._endereco = value;
  }

  public get idade(): number {
    return this._idade;
  }
  private set idade(idade: number) {
    if(idade < 0){
      throw Error();
    }
    this._idade = idade;
  }

  public get telefone(): string {
    return this._telefone;
  }
  private set telefone(telefone: string) {
    const regexp: RegExp = /^\d{2}\-?\d{4}\-?\d{4}$/;
    if(!regexp.test(telefone)){
      throw Error();
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