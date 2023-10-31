import { DomainException } from "../../../shared/exception/domain.exception";

class NomeInvalido extends DomainException{
  constructor(message: string = 'Nome Inválido'){
    super(message);
    this.message = message;
  }
}

class CPFinvalido extends DomainException{
  constructor(message: string = 'CPF inválido'){
    super(message);
    this.message = message;
  }
}

class IdadeInvalida extends DomainException{
  constructor(message: string = 'Idade inválida'){
    super(message);
    this.message = message;
  }
}

class TelefoneInvalido extends DomainException{
  constructor(message: string = 'Telefone inválido'){
    super(message);
    this.message = message;
  }
}

export const PacienteExceptions = {
  NomeInvalido,
  CPFinvalido,
  IdadeInvalida,
  TelefoneInvalido
}
