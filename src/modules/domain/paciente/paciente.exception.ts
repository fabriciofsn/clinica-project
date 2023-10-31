import { DomainException } from "../../../shared/exception/domain.exception";

class NomeInvalido extends DomainException{
  constructor(message: string = 'Nome Inválido'){
    super(message);
    this.message = message;
  }
}