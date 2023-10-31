export class DomainException extends Error{
  constructor(message: string = 'Exceção De Domínio'){
    super(message);
    this.message = message;
  }
}