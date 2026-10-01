/*
 * Dados da árvore de decisão, com base nas regras oficiais de retorno.
 * Cada nó tem uma pergunta e duas arestas (sim/nao). Uma aresta pode ter:
 *  - proximo: id do próximo nó
 *  - resultado: código de um RESULTADO (ver resultado.js)
 *  - info: código de um RESULTADO a exibir como aviso intermediário, seguido de "proximo"
 *  - dynamic: marca uma resolução calculada pela engine (ver engine.js)
 *  - setFlag: efeito de estado (ativa uma flag, ex.: NUNCA_TROCAR)
 *  - overrides: lista de { flag, resultado|proximo } aplicada pela engine quando a flag está ativa,
 *    substituindo o resultado/proximo padrão da aresta
 *
 * Observações que NÃO entram como pergunta interativa (ficam explicadas no card "Atenção" da tela,
 * pois exigem que a atendente já saiba de antemão, olhando o sistema de agendamento, antes de rodar o fluxo):
 *  - indicação de retorno com outro profissional (ícone de pessoa no sistema de agendamento);
 *  - troca de modalidade de atendimento.
 *
 * Especialidades restritas (Psiquiatria, Obstetrícia, Pediatria menor de 1 ano): a seta pode ficar
 * azul mesmo nessas especialidades, mas só quando o profissional indicou o retorno na própria
 * consulta (validando um dos critérios de exceção). Por isso cada bloco pergunta primeiro pela
 * seta azul e, na ausência dela, verifica todos os critérios de exceção em uma única pergunta.
 */
(function () {
  'use strict';

  var flow = {
    'T1-Q2': {
      pergunta: 'A especialidade da consulta original é Psiquiatria?',
      sim: { proximo: 'T3-PSI-Q1' },
      nao: { proximo: 'T1-Q3' }
    },
    'T1-Q3': {
      pergunta: 'A especialidade da consulta original é Obstetrícia?',
      sim: { proximo: 'T3-OBS-Q1' },
      nao: { proximo: 'T1-Q4' }
    },
    'T1-Q4': {
      pergunta: 'A especialidade é Pediatria E o paciente tem menos de 1 ano?',
      sim: { proximo: 'T3-PED-Q1' },
      nao: { proximo: 'T4-J1' }
    },

    'T2-Q1': {
      pergunta: 'O retorno já está agendado ou houve atraso de um exame feito na clínica, dentro de até 30 dias?',
      sim: { resultado: 'P28' },
      nao: { proximo: 'T1-Q2' }
    },

    'T3-PSI-Q1': {
      pergunta: 'Há indicação de retorno no sistema de agendamento (seta azul) para esta consulta de Psiquiatria?',
      sim: { setFlag: 'NUNCA_TROCAR', proximo: 'T4-J1' },
      nao: { proximo: 'T3-PSI-Q2' }
    },
    'T3-PSI-Q2': {
      pergunta: 'O paciente relata alergia medicamentosa/reação a medicação, ideação suicida OU risco a terceiros?',
      sim: { setFlag: 'NUNCA_TROCAR', proximo: 'T4-J1' },
      nao: { resultado: 'P32' }
    },

    'T3-OBS-Q1': {
      pergunta: 'Há indicação de retorno no sistema de agendamento (seta azul) para esta consulta de Obstetrícia?',
      sim: { proximo: 'T4-J1' },
      nao: { proximo: 'T3-OBS-Q2' }
    },
    'T3-OBS-Q2': {
      pergunta: 'O paciente relata alergia medicamentosa, USG obstétrica alterada, diabetes descompensada OU perda gestacional?',
      sim: { proximo: 'T4-J1' },
      nao: { resultado: 'P32' }
    },

    'T3-PED-Q1': {
      pergunta: 'Há indicação de retorno no sistema de agendamento (seta azul) para esta consulta de Pediatria?',
      sim: { proximo: 'T4-J1' },
      nao: { proximo: 'T3-PED-Q2' }
    },
    'T3-PED-Q2': {
      pergunta: 'O paciente relata alergia medicamentosa?',
      sim: { proximo: 'T4-J1' },
      nao: { resultado: 'P32' }
    },

    'T4-J1': {
      pergunta: 'O paciente entra em contato dentro de 30 dias da consulta original?',
      sim: { proximo: 'T4-D1' },
      nao: { resultado: 'P29' }
    },

    'T4-D1': {
      pergunta: 'Há agenda do profissional, no mesmo centro médico, dentro de 30 dias?',
      sim: { proximo: 'T4-A1' },
      nao: { proximo: 'T4-X1' }
    },

    'T4-A1': {
      pergunta: 'O paciente aceita a agenda oferecida?',
      sim: { dynamic: 'confirmacao' },
      nao: { resultado: 'P30' }
    },

    'T4-X1': {
      pergunta: 'Há agenda do profissional no mesmo centro médico dentro de 60 dias?',
      sim: { proximo: 'T4-X2' },
      nao: { proximo: 'T4-X4' }
    },
    'T4-X2': {
      pergunta: 'O paciente aceita a primeira agenda oferecida (60 dias, mesmo centro médico)?',
      sim: {
        resultado: 'P12',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P24' }]
      },
      nao: {
        proximo: 'T4-X3',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P25' }]
      }
    },
    'T4-X3': {
      pergunta: 'O paciente exige ser atendido dentro de 30 dias?',
      sim: {
        resultado: 'P31',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P25' }]
      },
      nao: { proximo: 'T4-X4' }
    },
    'T4-X4': {
      pergunta: 'Há agenda do profissional no centro médico mais próximo do paciente, dentro de 60 dias?',
      sim: { proximo: 'T4-X5' },
      nao: {
        resultado: 'P31',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P25' }]
      }
    },
    'T4-X5': {
      pergunta: 'O paciente aceita ser atendido no outro centro médico (dentro de 60 dias)?',
      sim: {
        resultado: 'P16',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P24' }]
      },
      nao: {
        proximo: 'T4-X6',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P25' }]
      }
    },
    'T4-X6': {
      pergunta: 'O paciente exige ser atendido dentro de 30 dias?',
      sim: {
        proximo: 'T4-EXIGE-CHECK-X',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P25' }]
      },
      nao: {
        resultado: 'P17-P20',
        overrides: [{ flag: 'NUNCA_TROCAR', resultado: 'P25' }]
      }
    },

    'T4-EXIGE-CHECK-X': {
      pergunta: 'Essa exigência inclui manter o MESMO profissional e o MESMO centro médico (não apenas ser atendido dentro de 30 dias)?',
      sim: { resultado: 'P21' },
      nao: { resultado: 'P19' }
    }
  };

  var tiposRetorno = [
    { id: 'padrao', label: 'Retorno padrão', entrada: 'T4-J1' },
    { id: 'reagendamento', label: 'Reagendamento', entrada: 'T2-Q1' },
    { id: 'especialidade', label: 'Especialidade restrita', entrada: 'T1-Q2' }
  ];

  window.RF = window.RF || {};
  window.RF.flow = flow;
  window.RF.tiposRetorno = tiposRetorno;
})();
