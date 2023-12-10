import { DomainException } from "@shared/exception/domain.exception";

class PacienteJaCadastrado extends DomainException{
  constructor(message: string = 'Paciente já cadastrado com este CPF'){
    super(message);
    this.message = message;
    this.name = "PacienteJáCadastrado";
  }
}



export const useCasesExceptions = {
  PacienteJaCadastrado,
}
