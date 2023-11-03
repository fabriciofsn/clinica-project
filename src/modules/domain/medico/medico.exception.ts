import { DomainException } from "@shared/exception/domain.exception";

class MedicoException extends DomainException{
  constructor(message: string = 'Exceção Médico'){
    super(message);
    this.message = message;
  }
}

export class CRMinvalido extends MedicoException {
  constructor(message: string = 'CRM inválido'){
    super(message);
    this.message = message;
  }
}

export const MedicoExceptions = {
 CRMinvalido,
}
