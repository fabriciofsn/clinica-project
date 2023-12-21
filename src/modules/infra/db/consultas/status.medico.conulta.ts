import { paymentMethod, paymentStatus, statusConsulta } from "@modules/consulta/consulta.interface";
import { StatusMedico } from "@modules/domain/medico/medico.interface";

export class resolveEnumFromMongo{
  public static fromMongoToStatus(status: string): StatusMedico{
    if(status === 'ATIVO') return StatusMedico.ATIVO;
    if(status ===  'INATIVO') return StatusMedico.INATIVO;
    if(status === 'AFASTADO') return StatusMedico.AFASTADO;
    if(status === 'FERIAS') return StatusMedico.FERIAS;
    if(status === 'LICENÇA') return StatusMedico.LICENCA;

    throw new Error('Status Médico Inválido!');
  }

  public static fromMongoToPayment(payment: string): paymentStatus{
    if(payment === 'CONFIRMADO') return paymentStatus.CONFIRMADO;
    if(payment === 'PENDENTE') return paymentStatus.PENDENTE;

    throw new Error('Status do pagamento inválido!');
  }

  public static fromMongoToStatusConsulta(status: string): statusConsulta{
    if(status === 'AGENDADA') return statusConsulta.AGENDADA;
    if(status === 'CANCELADA') return statusConsulta.CANCELADA;

    throw new Error('Status da consulta é inválido!');
  }

  public static fromMongoToPaymentMethod(method: string): paymentMethod{
    if(method == 'CARTAO DE CREDITO') return paymentMethod.CARTAO_DE_CREDITO;
    if(method == 'CARTAO DE DEBITO') return paymentMethod.CARTAO_DE_DEBITO;
    if(method == 'PIX') return paymentMethod.PIX;
    if(method == 'EM DINHEIRO') return paymentMethod.EM_DINHEIRO;
    
    throw new Error('Método de pagamento é inválido!');
  }
}
