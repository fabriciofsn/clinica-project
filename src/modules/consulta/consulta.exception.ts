import { DomainException } from "@shared/exception/domain.exception";

class ErrorDomainConsulta extends DomainException{
  constructor(message: string = 'Error consulta'){
    super(message);
    this.message = message;
  }
}

class ValorInválido extends ErrorDomainConsulta{
  constructor(message: string = 'Valor inválido! Valor não pode ser menor que zero'){
    super(message);
    this.message = message;
  }
}

export const consultaExceptions = {
  ValorInválido,
}
