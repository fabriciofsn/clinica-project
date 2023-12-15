import { DomainException } from "@shared/exception/domain.exception";

class PacienteJaCadastrado extends DomainException{
  constructor(message: string = 'Paciente já cadastrado com este CPF'){
    super(message);
    this.message = message;
    this.name = "PacienteJáCadastrado";
  }
}

class PacienteInexistente extends DomainException{
  constructor(message: string = 'Paciente não encontrado.'){
    super(message);
    this.message = message;
    this.name = 'PacienteNãoEncontrado';
  }
}

export const useCasesExceptions = {
  PacienteJaCadastrado,
  PacienteInexistente
}
