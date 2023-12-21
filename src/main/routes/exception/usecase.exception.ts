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

class MedicoJaCadastrado extends DomainException{
  constructor(message: string = 'Médico já cadastrado com este CRM'){
    super(message);
    this.message = message;
    this.name = "MedicoJáCadastrado";
  }
}

class MedicoInexistente extends DomainException{
  constructor(message: string = 'Médico não encontrado.'){
    super(message);
    this.message = message;
    this.name = 'MédicoNãoEncontrado';
  }
}

class ConsultaNaoExiste extends DomainException{
  constructor(message: string = 'Consulta não encontrada na base de dados.'){
    super(message);
    this.message = message;
    this.name = 'ConsultaNaoExiste';
  }
}

export const useCasesExceptions = {
  PacienteJaCadastrado,
  PacienteInexistente,
  MedicoJaCadastrado,
  MedicoInexistente,
  ConsultaNaoExiste
}
