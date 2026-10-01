/*
 * Dados dos desfechos: apenas a ação que o colaborador deve tomar, em linguagem direta,
 * sem siglas internas (nada de códigos de regra, RRM, CR etc.) — é só o que ele precisa
 * fazer, não um script para o paciente.
 */
(function () {
  'use strict';

  var resultados = {
    P02: { acao: 'Confirmar o agendamento do retorno.' },
    P12: { acao: 'Confirmar o agendamento do retorno (dentro do prazo estendido de 60 dias).' },
    P16: { acao: 'Confirmar o agendamento do retorno em outro centro médico.' },
    'P17-P20': { acao: 'Ofertar retorno relacionamento com outro profissional da mesma especialidade, na mesma unidade, e aguardar contato da equipe com as opções de agenda.' },
    P19: { acao: 'Ofertar retorno relacionamento com outro profissional da mesma especialidade.' },
    P21: { acao: 'Acionar a supervisão, pois o paciente exige o mesmo profissional e a mesma unidade dentro de 30 dias.' },
    P24: { acao: 'Confirmar o agendamento do retorno, mantendo sempre o mesmo profissional (psiquiatria não troca de profissional).' },
    P25: { acao: 'Acionar a supervisão para dar sequência ao caso, mantendo sempre o mesmo profissional (psiquiatria não troca de profissional).' },
    P28: { acao: 'Permitir o reagendamento do retorno, desde que dentro dos 30 dias. *não reagendar caso já esteja dentro dos 60 dias e oferecer consulta paga no sistema de agendamento.' },
    P29: { acao: 'Informar que prazo de 30 dias para retorno já foi encerrado e oferecer consulta paga no sistema de agendamento.' },
    P30: { acao: 'Procurar a agenda mais próxima e ofertar (sem extrapolar os 30 dias). Se houver recusa, informar que o prazo do retorno gratuito é de 30 dias e ofertar consulta paga no sistema de agendamento.' },
    P31: { acao: 'Ofertar retorno relacionamento médico da mesma especialidade e no centro médico mais próximo. Se houver recusa porque o paciente não quer passar com outro profissional, contatar o supervisor para abertura de consulta relacionamento.' },
    P32: { acao: 'Informar ao paciente que o profissional não deixou indicação de retorno e ofertar consulta paga no sistema de agendamento.' }
  };

  window.RF = window.RF || {};
  window.RF.resultados = resultados;
})();
