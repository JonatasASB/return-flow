# Fluxo de Atendimento — Agendamento de Retorno

**Fluxo por tipo de retorno, com perguntas binárias (Sim/Não) e respostas padrão ao paciente**

*Documento gerado em 23/08/2026 — v1.2 (reorganizado por tipo de retorno + respostas padrão) — Baseado em um documento interno de regras de retorno*

---

## Sumário

- [Introdução](#introdução)
- [Glossário](#glossário)
- [Premissas assumidas — revisadas com a equipe](#premissas-assumidas--revisadas-com-a-equipe)
- [Parte 1 — Mapa de todas as possibilidades de desfecho](#parte-1--mapa-de-todas-as-possibilidades-de-desfecho)
- [Parte 2 — Árvore de decisão por tipo de retorno](#parte-2--árvore-de-decisão-por-tipo-de-retorno)
- [Parte 3 — Índice por tipo de ação (para consulta rápida)](#parte-3--índice-por-tipo-de-ação-para-consulta-rápida)
- [Anexo — Regras originais renumeradas](#anexo--regras-originais-renumeradas)

---

## Introdução

Este documento traduz as regras de retorno em um fluxo operacional para a equipe de atendimento, organizado em três partes:

Parte 1 lista todos os desfechos possíveis para um pedido de retorno, cada um com um ID único, a ação a registrar no sistema e a resposta padrão a repassar ao paciente. Parte 2 é a árvore de perguntas — agora dividida por TIPO de retorno (Triagem, Reagendamento, Elegibilidade de especialidade restrita e Retorno Padrão) — que a atendente segue, sempre respondendo Sim ou Não, até chegar a um desses desfechos. Parte 3 é um índice reverso por tipo de ação, útil para consulta rápida. O Anexo reproduz as regras originais renumeradas (RN1 a RN15), para rastreabilidade.

Convenção da árvore: cada linha é um Nó com uma pergunta de resposta Sim/Não, e o próximo passo — outro Nó, ou um RESULTADO (código, ação no sistema e o texto que a atendente já pode usar com o paciente). Textos entre chaves, como {data} ou {profissional}, são campos que a atendente preenche ao usar a resposta.

Abreviações usadas no fluxo: RRM = Retorno Relacionamento Médico (retorno com OUTRO profissional, da mesma especialidade); CR = Consulta Relacionamento (acionamento do supervisor).

## Glossário

| Termo | Significado |
|---|---|
| Sistema de agendamento | Sistema onde a consulta fica registrada. É nele que aparecem as indicações (setinhas) de retorno autorizadas pelo médico. |
| Seta azul (sistema de agendamento) | Indica que o médico autorizou/registrou retorno para o paciente. |
| Seta laranja (sistema de agendamento) | Indica que o médico autorizou o retorno especificamente com OUTRO profissional, diferente do que realizou a consulta original. |
| Profissional-alvo | Termo usado neste documento para designar o profissional com quem o retorno deve ser buscado: o da consulta original ou, quando houver seta laranja, o profissional indicado. |
| RRM — Retorno Relacionamento Médico | Retorno agendado com OUTRO profissional, da MESMA especialidade, fora do fluxo padrão. Não é usado quando o profissional continua sendo o mesmo — nesse caso é apenas um agendamento normal, ainda que por uma via de exceção (ver nota sobre Psiquiatria no Glossário/Premissa 2). |
| CR — Consulta Relacionamento | Acionamento do supervisor para tratar um caso fora das regras padrão, sem trocar de profissional. |
| Clínica | A instituição de saúde que presta o atendimento. Usada na regra de cancelamento (cancelamento por parte da clínica = atribuído à clínica/profissional, não ao paciente) e na regra de atraso de exame. |
| Falta | Não comparecimento do paciente a uma consulta ou retorno previamente agendado. |
| PS | Pronto-Socorro. |
| Sinalizador NUNCA-TROCAR-PROFISSIONAL | Marcador ativado apenas quando a origem do caso é Psiquiatria sem seta azul, elegível por critério de exceção clínica (ver Tipo 3). Enquanto ativo, nenhum resultado do Tipo 4 pode ser RRM — é sempre substituído por CR, mantendo o mesmo profissional. |

## Premissas assumidas — revisadas com a equipe

Cada item indica se a premissa original foi **confirmada** ou **corrigida**; nos itens corrigidos, o texto já reflete a regra certa. O último item é novo nesta versão e ainda precisa de confirmação.

1. **[Confirmada]** Obstetrícia e Pediatria (menor de 1 ano) sem seta azul, mas com critério de exceção atendido: o caso segue o fluxo padrão de agendamento (Tipo 4).

2. **[Corrigida]** Psiquiatria sem seta azul, mas com critério de exceção atendido (alergia a medicação, ideação suicida ou risco a terceiros): o caso segue o fluxo padrão de prazos (Tipo 4, incluindo a cascata de 60 dias) como qualquer outro retorno — porém, com o sinalizador NUNCA-TROCAR-PROFISSIONAL ativado: sempre que o Tipo 4 chegaria a um RRM, o resultado passa a ser CR (acionar supervisor), mantendo o mesmo profissional. Como o profissional não muda, esse agendamento não é rotulado como RRM — é uma confirmação de agenda normal, apenas alcançada por uma via de exceção clínica (código P24).

3. **[Corrigida]** O sistema de agendamento é o próprio sistema onde a consulta fica registrada (não apenas um campo dentro dele), e é nele que o retorno é agendado.

4. **[Corrigida]** Em caso de indisponibilidade do profissional-alvo dentro de 30 dias, a atendente não aciona o supervisor de imediato: segue a cascata de busca de 60 dias (Tipo 4, bloco X) — mesmo centro médico, depois centro médico mais próximo, depois outro profissional no centro original — descrita nesta versão. CR/RRM só entram nos três casos específicos listados no bloco X. A regra de faltas continua valendo apenas para recusa de agendas oferecidas (Tipo 4, bloco A), não para indisponibilidade pura.

5. **[Confirmada]** As regras sobre o paciente exigir atendimento em condições específicas (dentro de 30 dias; mesmo centro médico; mesmo profissional e mesmo centro) são gatilhos de escalonamento distintos, mantidos separados na árvore de decisão.

6. **[Confirmada]** A regra da seta laranja pode ser aplicada a qualquer especialidade, não somente às especialidades restritas.

7. **[Corrigida]** Se o motivo do contato for reagendamento por atraso de exame, mas esse atraso não tiver ocorrido dentro de uma consulta da clínica, o caso segue o fluxo padrão das regras estabelecidas — reinicia a triagem de especialidade (Tipo 1) como um pedido comum de retorno.

8. **[Nova — confirmar com a equipe]** A regra original (RN6) previa que, especificamente em Psiquiatria, a recusa da agenda de 60 dias fosse direto para CR, sem passar pela busca em outro centro médico ou outro profissional. Nesta versão, unificamos: Psiquiatria com seta azul (fluxo normal, sem o sinalizador NUNCA-TROCAR) segue a mesma cascata do bloco X que as demais especialidades, podendo resultar em RRM. Recomendamos confirmar se esse comportamento é o desejado ou se a Psiquiatria com seta azul deve manter um atalho direto para CR.

---

## Parte 1 — Mapa de todas as possibilidades de desfecho

Cada situação recebe um ID único, usado na árvore de decisão (Parte 2) e no índice por ação (Parte 3). A última coluna é o texto padrão que a atendente pode repassar ao paciente.

*Campos entre chaves (ex.: {data}, {profissional}, {centroMedico}) são preenchidos pela atendente ao usar a resposta com o paciente.*

### Tipo 1/3 — Não elegível (Pronto-Socorro)

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P01 | Especialidade restrita (Psiquiatria, Obstetrícia ou Pediatria com paciente menor de 1 ano), sem seta azul e sem enquadramento nos critérios de exceção da especialidade. | Orientar o paciente a procurar atendimento no Pronto-Socorro. | RN1, RN2 | No momento, esse caso não se enquadra nas regras de retorno gratuito. Como você relatou uma urgência, oriento procurar o Pronto-Socorro mais próximo. |

### Tipo 2 — Reagendamento por atraso de exame

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P28 | Retorno já agendado; houve atraso de exame dentro de uma consulta da clínica realizada em até 30 dias. | Permitir o reagendamento do retorno. | RN15 | Sem problemas, vamos reagendar seu retorno. Qual seria a melhor data para você? |

### Tipo 4 — Confirmações dentro de 30 dias

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P02 | Contato dentro de 30 dias; há agenda com o profissional-alvo no mesmo centro médico; paciente aceita a 1ª opção, modalidade original. | Confirmar agendamento. | RN3 | Seu retorno está confirmado para {data}, às {hora}, com {profissional}, em {centroMedico}. |
| P03 | Troca de modalidade autorizada pelo profissional; agenda disponível na nova modalidade. | Confirmar agendamento na nova modalidade. | RN3 | Seu retorno está confirmado para {data}, às {hora}, com {profissional}, na modalidade {modalidade}. |
| P04 | Paciente recusa a 1ª opção, mas aceita outra data dentro de 30 dias. | Confirmar agendamento na nova data. | RN3, RN4 | Certo! Seu retorno está confirmado para {data}, às {hora}, com {profissional}, em {centroMedico}. |
| P05 | Troca de modalidade não disponível (autorizada sem agenda, ou não autorizada e paciente não insiste, ou insistiu mas sem agenda em 30 dias) — mantém-se a modalidade original. | Oferecer a modalidade original. | RN3, RN5 | Não foi possível confirmar a nova modalidade dentro do prazo. Posso confirmar seu retorno na modalidade {modalidadeOriginal}, em {data}? |
| P06 | Paciente recusa múltiplas agendas dentro de 30 dias, mas aceita uma antes de o prazo se esgotar. | Confirmar agendamento. | RN4 | Conseguimos uma nova opção: seu retorno está confirmado para {data}, às {hora}, com {profissional}, em {centroMedico}. |
| P29 | Profissional não autorizou troca de modalidade, mas o paciente exige mudar; há agenda do MESMO profissional na nova modalidade dentro de 30 dias (a regra de 60 dias não se aplica aqui). | Confirmar agendamento na nova modalidade, dentro de 30 dias. | RN3 | Conseguimos manter {profissional} na modalidade {novaModalidade} dentro do prazo. Seu retorno está confirmado para {data}, às {hora}. |

### Tipo 4 — Perda do retorno gratuito

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P07 | Prazo de 30 dias esgotado sem extensão aplicável (recusa sem faltas e sem cancelamento pela clínica, ou contato fora do prazo sem extensão registrada). | Informar perda do retorno gratuito; oferecer consulta paga no sistema de agendamento. | RN4 | Como o prazo de 30 dias do seu retorno gratuito não foi cumprido, esse benefício não está mais disponível. Posso verificar uma consulta particular para você? |
| P08 | Necessidade de reagendar além de 30 dias decorre de cancelamento por parte da clínica; sem faltas registradas. | Autorizar extensão até 60 dias; iniciar a cascata de busca (bloco X). | RN4 | Como o cancelamento anterior não partiu de você, vamos estender o prazo do seu retorno gratuito em até 60 dias para encontrar uma nova data. |
| P09 | Paciente com 1 falta registrada, ao recusar todas as agendas oferecidas dentro de 30 dias. | Regra de extensão não se aplica; informar perda do retorno gratuito; oferecer consulta paga. | RN4 | Identificamos uma falta no seu histórico, o que não permite estender o prazo. Como os 30 dias do seu retorno gratuito já passaram, esse benefício não está mais disponível. Posso verificar uma consulta particular? |
| P10 | Paciente com 2 ou mais faltas registradas, ao recusar as agendas oferecidas dentro de 30 dias. | Perda automática do retorno gratuito; oferecer consulta paga. | RN4 | Identificamos duas ou mais faltas no seu histórico, o que faz o retorno gratuito ser perdido automaticamente. Posso verificar uma consulta particular para você? |

### Tipo 4 — Cascata de 60 dias (bloco X)

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P12 | Sem agenda em 30 dias; há agenda do profissional-alvo no MESMO centro médico dentro de 60 dias; paciente aceita. | Confirmar agendamento dentro do prazo estendido. | RN5, RN6 | Seu retorno está confirmado para {data}, às {hora}, com {profissional}, em {centroMedico}. |
| P16 | Sem agenda do profissional-alvo no centro médico original dentro de 60 dias; há agenda no centro médico mais próximo; paciente aceita. | Confirmar agendamento no outro centro médico. | RN9, RN10 | Não havia mais horários com {profissional} na unidade em que você foi atendido, mas conseguimos uma vaga em {outroCentroMedico}. Seu retorno está confirmado para {data}, às {hora}. |
| P17/P20 | Paciente recusa o centro médico alternativo (ou exige permanecer no centro original) e não exige os 30 dias. | Abrir RRM com outro profissional, mesma especialidade, no centro médico original. | RN11, RN12 | Como não há mais horários com {profissional} na sua unidade e você prefere continuar nela, vou abrir seu retorno com outro profissional da mesma especialidade, nessa mesma unidade. Nossa equipe entra em contato em breve com as opções de agenda. |
| P18 | Profissional-alvo sem agenda em nenhum centro médico dentro de 60 dias (nem original, nem o mais próximo). | Abrir RRM com outro profissional, mesma especialidade. | RN9, RN12 | Não encontramos horários com {profissional} em nenhuma unidade dentro do prazo. Vou abrir seu retorno com outro profissional da mesma especialidade. Nossa equipe entra em contato em breve com as opções de agenda. |
| P19 | Profissional-alvo tem agenda dentro de 60 dias (mesmo centro ou outro), mas o paciente exige ser atendido dentro de 30 dias. | Abrir RRM com outro profissional, mesma especialidade. | RN8 | Entendo que você precisa ser atendido dentro de 30 dias. Vou abrir seu retorno com outro profissional da mesma especialidade para buscarmos uma data mais próxima. Nossa equipe entra em contato em breve. |

### Tipo 4 — Escalonamentos para supervisor (CR)

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P21 | Paciente exige, especificamente, o mesmo profissional E o mesmo centro médico dentro de 30 dias, sem disponibilidade natural. | Avisar supervisor para abertura de CR. | RN13 | Vou registrar sua solicitação e encaminhar para nossa supervisão, já que você precisa manter o mesmo profissional e a mesma unidade dentro de 30 dias. Retornaremos em breve com uma posição. |
| P25 | Sinalizador NUNCA-TROCAR-PROFISSIONAL ativo (origem Psiquiatria por exceção clínica) e a cascata do bloco X chegaria a um RRM. | Consultar supervisor para abertura de CR — jamais trocar de profissional. | RN2 | Vou encaminhar sua solicitação para nossa supervisão, para garantir que você seja atendido pelo mesmo profissional o quanto antes. Retornaremos em breve com uma posição. |

### Tipo 4 — Seta laranja (profissional indicado)

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P22 | sistema de agendamento indica retorno com outro profissional específico (seta laranja); agenda encontrada com esse profissional. | Agendar retorno normal com o profissional indicado. | RN14 | Seu retorno será com {profissionalIndicado}, conforme orientação médica. Vou verificar a agenda disponível. |
| P23 | Seta laranja; nem o profissional indicado nem o profissional da consulta original têm agenda disponível. | Abrir RRM. | RN14 | Não encontramos agenda disponível nem com {profissionalIndicado} nem com {profissionalOriginal}. Vou abrir seu retorno com outro profissional da mesma especialidade. |

### Tipo 3 — Psiquiatria por exceção clínica (mesmo profissional, sempre)

| ID | Situação / Cenário | Ação no sistema | Regra(s) | Resposta padrão ao paciente |
|---|---|---|---|---|
| P24 | Sinalizador NUNCA-TROCAR-PROFISSIONAL ativo; o Tipo 4 encontra e confirma agenda do mesmo profissional (30 dias, 60 dias ou outro centro médico). | Confirmar agendamento com o mesmo profissional — via de exceção clínica da Psiquiatria; não é RRM, pois o profissional não muda. | RN2 | Seu retorno está confirmado para {data}, às {hora}, com {profissional}, em {centroMedico}. |

*Em relação à versão anterior deste documento, os códigos P11, P13, P14 e P15 foram retirados: seus cenários agora são cobertos, de forma mais detalhada, pela cascata de 60 dias do Tipo 4 (bloco X, P12/P16/P17/P18/P19/P20).*

---

## Parte 2 — Árvore de decisão por tipo de retorno

O fluxo é dividido em TIPOS, para ficar mais curto e intuitivo de seguir. Toda pergunta tem resposta Sim ou Não. Cada linha traz o Nó, a pergunta, a resposta e o próximo passo — outro Nó, ou um **RESULTADO** (código da Parte 1).

### TIPO 1 — Triagem inicial

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T1-Q1 | O paciente já possui um retorno marcado e está pedindo para reagendar por atraso de exame? | Sim | Ir para TIPO 2 |
| T1-Q1 | (mesma pergunta) | Não | Ir para T1-Q2 |
| T1-Q2 | A especialidade da consulta original é Psiquiatria? | Sim | Ir para TIPO 3 — bloco Psiquiatria |
| T1-Q2 | (mesma pergunta) | Não | Ir para T1-Q3 |
| T1-Q3 | A especialidade da consulta original é Obstetrícia? | Sim | Ir para TIPO 3 — bloco Obstetrícia |
| T1-Q3 | (mesma pergunta) | Não | Ir para T1-Q4 |
| T1-Q4 | A especialidade é Pediatria E o paciente tem menos de 1 ano? | Sim | Ir para TIPO 3 — bloco Pediatria |
| T1-Q4 | (mesma pergunta) | Não | Ir para TIPO 4 (T4-P1) |

### TIPO 2 — Reagendamento por atraso de exame

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T2-Q1 | O atraso do exame ocorreu dentro de uma consulta da clínica realizada em até 30 dias? | Sim | RESULTADO: permitir reagendamento (P28) |
| T2-Q1 | (mesma pergunta) | Não | Segue o fluxo padrão como um pedido comum de retorno. Ir para T1-Q2 |

### TIPO 3 — Elegibilidade: bloco Psiquiatria

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T3-PSI-Q1 | Há indicação de retorno no sistema de agendamento (seta azul)? | Sim | Ir para TIPO 4 (T4-P1) — fluxo normal, sinalizador NUNCA-TROCAR desativado |
| T3-PSI-Q1 | (mesma pergunta) | Não | Ir para T3-PSI-Q2 |
| T3-PSI-Q2 | O paciente relata alergia a medicação? | Sim | Ativar sinalizador NUNCA-TROCAR-PROFISSIONAL; profissional-alvo = profissional da consulta original (fixo). Ir para TIPO 4 (T4-J1) — pula T4-P1 |
| T3-PSI-Q2 | (mesma pergunta) | Não | Ir para T3-PSI-Q3 |
| T3-PSI-Q3 | O paciente relata ideação suicida? | Sim | [mesma ação de T3-PSI-Q2=Sim] Ir para TIPO 4 (T4-J1) |
| T3-PSI-Q3 | (mesma pergunta) | Não | Ir para T3-PSI-Q4 |
| T3-PSI-Q4 | O paciente relata risco a terceiros? | Sim | [mesma ação de T3-PSI-Q2=Sim] Ir para TIPO 4 (T4-J1) |
| T3-PSI-Q4 | (mesma pergunta) | Não | RESULTADO: orientar Pronto-Socorro (P01) |

### TIPO 3 — Elegibilidade: bloco Obstetrícia

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T3-OBS-Q1 | Há indicação de retorno no sistema de agendamento (seta azul)? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-OBS-Q1 | (mesma pergunta) | Não | Ir para T3-OBS-Q2 |
| T3-OBS-Q2 | O paciente relata alergia a medicação? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-OBS-Q2 | (mesma pergunta) | Não | Ir para T3-OBS-Q3 |
| T3-OBS-Q3 | O paciente relata USG obstétrica alterada? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-OBS-Q3 | (mesma pergunta) | Não | Ir para T3-OBS-Q4 |
| T3-OBS-Q4 | O paciente relata diabetes descompensada? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-OBS-Q4 | (mesma pergunta) | Não | Ir para T3-OBS-Q5 |
| T3-OBS-Q5 | O paciente relata perda gestacional? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-OBS-Q5 | (mesma pergunta) | Não | RESULTADO: orientar Pronto-Socorro (P01) |

### TIPO 3 — Elegibilidade: bloco Pediatria (menor de 1 ano)

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T3-PED-Q1 | Há indicação de retorno no sistema de agendamento (seta azul)? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-PED-Q1 | (mesma pergunta) | Não | Ir para T3-PED-Q2 |
| T3-PED-Q2 | O paciente relata alergia a medicação? | Sim | Ir para TIPO 4 (T4-P1) |
| T3-PED-Q2 | (mesma pergunta) | Não | RESULTADO: orientar Pronto-Socorro (P01) |

### TIPO 4 — bloco P: profissional-alvo

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T4-P1 | Há, no sistema de agendamento, indicação de retorno com outro profissional específico (seta laranja)? (Se o sinalizador NUNCA-TROCAR estiver ativo, esta pergunta é pulada — profissional-alvo já é fixo.) | Sim | Profissional-alvo = indicado pela seta laranja. Ir para T4-J1 |
| T4-P1 | (mesma pergunta) | Não | Profissional-alvo = profissional da consulta original. Ir para T4-J1 |

### TIPO 4 — bloco J: janela de prazo

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T4-J1 | O paciente entra em contato dentro de 30 dias da consulta original? | Sim | Ir para T4-D1 |
| T4-J1 | (mesma pergunta) | Não | Ir para T4-J2 |
| T4-J2 | Já havia uma extensão de prazo registrada/autorizada para este caso? | Sim | Ir para T4-J3 |
| T4-J2 | (mesma pergunta) | Não | RESULTADO: prazo esgotado; oferecer consulta paga (P07) |
| T4-J3 | Essa extensão ainda está dentro de 60 dias? | Sim | Ir para TIPO 4 — bloco X (T4-X1), direto na janela estendida |
| T4-J3 | (mesma pergunta) | Não | RESULTADO: prazo esgotado mesmo com a extensão; oferecer consulta paga (P07) |

### TIPO 4 — bloco D: disponibilidade em 30 dias

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T4-D1 | Há agenda do profissional-alvo, no mesmo centro médico, dentro de 30 dias? | Sim | Ir para T4-M1 |
| T4-D1 | (mesma pergunta) | Não | Ir para TIPO 4 — bloco X (T4-X1) |

### TIPO 4 — bloco M: modalidade

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T4-M1 | O paciente deseja trocar a modalidade de atendimento (ex.: presencial ↔ teleconsulta)? | Não | Oferecer 1ª agenda na modalidade original. Ir para T4-A1 |
| T4-M1 | (mesma pergunta) | Sim | Ir para T4-M2 |
| T4-M2 | O profissional autorizou a troca de modalidade? | Sim | Ir para T4-M3 |
| T4-M2 | (mesma pergunta) | Não | Ir para T4-M4 |
| T4-M3 | Há agenda do mesmo profissional na nova modalidade, dentro do prazo em análise? | Sim | Oferecer agenda na nova modalidade (P03). Ir para T4-A1 |
| T4-M3 | (mesma pergunta) | Não | Oferecer modalidade original (P05). Ir para T4-A1 |
| T4-M4 | O paciente exige a troca de modalidade mesmo sem autorização do profissional? | Sim | Ir para T4-M5 |
| T4-M4 | (mesma pergunta) | Não | Oferecer modalidade original (P05). Ir para T4-A1 |
| T4-M5 | Há agenda do MESMO profissional na nova modalidade dentro de 30 dias? (a extensão a 60 dias não vale para esta exigência) | Sim | Oferecer agenda na nova modalidade, dentro de 30 dias (P29). Ir para T4-A1 |
| T4-M5 | (mesma pergunta) | Não | Não é possível atender à exigência; oferecer modalidade original (P05). Ir para T4-A1 |

### TIPO 4 — bloco A: aceite, recusa e faltas (dentro de 30 dias)

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T4-A1 | O paciente aceita a agenda oferecida? | Sim | RESULTADO: confirmar agendamento (P02/P03/P04/P06/P29 conforme o caminho; se o sinalizador NUNCA-TROCAR estiver ativo, usar P24) |
| T4-A1 | (mesma pergunta) | Não | Ir para T4-A2 |
| T4-A2 | O paciente exige ser atendido dentro de 30 dias, mesmo sem outra opção agora? | Sim | RESULTADO: abrir RRM (P19); se sinalizador NUNCA-TROCAR ativo, usar CR (P25) em vez de RRM |
| T4-A2 | (mesma pergunta) | Não | Ir para T4-A3 |
| T4-A3 | Há outra data disponível dentro de 30 dias com o profissional-alvo? | Sim | Oferecer nova data. Voltar para T4-A1 |
| T4-A3 | (mesma pergunta) | Não | Ir para T4-A4 |
| T4-A4 | O paciente possui 2 ou mais faltas registradas para esta consulta original? | Sim | RESULTADO: perda automática do retorno gratuito; oferecer consulta paga (P10) |
| T4-A4 | (mesma pergunta) | Não | Ir para T4-A5 |
| T4-A5 | O paciente possui 1 falta registrada para esta consulta original? | Sim | RESULTADO: regra de extensão não se aplica; oferecer consulta paga (P09) |
| T4-A5 | (mesma pergunta) | Não | Ir para T4-A6 |
| T4-A6 | A necessidade de reagendar além de 30 dias decorre de cancelamento por parte da clínica? | Sim | RESULTADO intermediário: extensão autorizada até 60 dias (P08). Ir para TIPO 4 — bloco X (T4-X1) |
| T4-A6 | (mesma pergunta) | Não | RESULTADO: perda do retorno gratuito; oferecer consulta paga (P07) |

### TIPO 4 — bloco X: cascata de 60 dias

| Nó | Pergunta / Verificação | Resposta | Próximo passo |
|---|---|---|---|
| T4-X1 | Há agenda do profissional-alvo no MESMO centro médico dentro de 60 dias? | Sim | Oferecer essa agenda. Ir para T4-X2 |
| T4-X1 | (mesma pergunta) | Não | Ir para T4-X4 |
| T4-X2 | O paciente aceita a agenda oferecida (60 dias, mesmo centro médico)? | Sim | RESULTADO: confirmar agendamento (P12; se sinalizador NUNCA-TROCAR ativo, usar P24) |
| T4-X2 | (mesma pergunta) | Não | Ir para T4-X3 |
| T4-X3 | O paciente exige ser atendido dentro de 30 dias? | Sim | RESULTADO: abrir RRM (P19); se sinalizador ativo, usar CR (P25) |
| T4-X3 | (mesma pergunta) | Não | Ir para T4-X4 |
| T4-X4 | Há agenda do profissional-alvo no centro médico MAIS PRÓXIMO do paciente, dentro de 60 dias? | Sim | Oferecer essa agenda. Ir para T4-X5 |
| T4-X4 | (mesma pergunta) | Não | RESULTADO: abrir RRM — sem agenda em nenhum centro médico dentro de 60 dias (P18); se sinalizador ativo, usar CR (P25) |
| T4-X5 | O paciente aceita ser atendido no outro centro médico (dentro de 60 dias)? | Sim | RESULTADO: confirmar agendamento no outro centro médico (P16; se sinalizador ativo, usar P24) |
| T4-X5 | (mesma pergunta) | Não | Ir para T4-X6 |
| T4-X6 | O paciente exige ser atendido dentro de 30 dias? | Sim | RESULTADO: abrir RRM (P19); se sinalizador ativo, usar CR (P25) |
| T4-X6 | (mesma pergunta) | Não | RESULTADO: abrir RRM — paciente não aceita mudar de centro médico (P17/P20); se sinalizador ativo, usar CR (P25) |

*Nota — seta laranja: se profissional-alvo é o indicado pela seta laranja e o bloco X chegaria a um resultado de RRM, verificar antes a agenda do profissional da consulta ORIGINAL dentro do mesmo prazo: se disponível, ofertar normalmente (P22) em vez de RRM; só se também estiver indisponível, aplica-se RRM (P23).*

*Nota — exigência específica: se, em vez de simplesmente recusar mudar de centro médico, o paciente exigir o mesmo profissional E o mesmo centro médico dentro de 30 dias, o resultado passa a ser CR (P21) em vez de RRM — ver Parte 1.*

---

## Parte 3 — Índice por tipo de ação (para consulta rápida)

Agrupa os desfechos pela ação final que a atendente registra no sistema.

| Ação no sistema | Ocorre nos desfechos |
|---|---|
| Confirmar agendamento (normal) | P02, P03, P04, P06, P12, P16, P29 |
| Confirmar agendamento — via de exceção clínica (Psiquiatria, mesmo profissional) | P24 |
| Orientar Pronto-Socorro | P01 |
| Abrir RRM (Retorno Relacionamento Médico — outro profissional, mesma especialidade) | P17/P20, P18, P19, P23 |
| Consultar/acionar supervisor para CR (Consulta Relacionamento) | P21, P25 |
| Informar perda do retorno gratuito + oferecer consulta paga (sistema de agendamento) | P07, P09, P10 |
| Estender prazo de busca (30 → 60 dias) | P08 |
| Permitir reagendamento por atraso de exame | P28 |
| Seguir fluxo padrão sem restrição adicional | P22 |

---

## Anexo — Regras originais renumeradas

Reprodução das regras do documento-fonte, na ordem original, renumeradas de RN1 a RN15 apenas para permitir referência cruzada com as Partes 1 e 2.

| Regra | Texto |
|---|---|
| RN1 | Toda consulta possui direito a retorno dentro de 30 dias, exceto psiquiatria, obstetrícia e pediatria (menor de 1 ano); nessas especialidades, o retorno só é possível com indicação no sistema de agendamento (seta de retorno azul). |
| RN2 | Em caso de retorno de psiquiatria, obstetrícia e pediatria (menor de 1 ano) sem indicação no sistema de agendamento, será possível agendar retorno nos critérios de exceção de cada especialidade (alergia a medicação, ideação suicida, risco a terceiros, USG obstétrica alterada, diabetes descompensada, perda gestacional, conforme a especialidade); para outros casos de urgência, orientar Pronto-Socorro. |
| RN3 | Se o paciente contatar para marcar retorno dentro de 30 dias, deve-se ofertar a primeira agenda do profissional que o atendeu na consulta original, no mesmo centro médico; troca de modalidade só com indicação do profissional e sempre com o mesmo profissional. |
| RN4 | Em caso de recusa, oferecer outro dia sem extrapolar os 30 dias; se recusar todas as agendas dentro de 30 dias, informar o prazo (cancelamento por parte da clínica permite reagendar fora do prazo, até 60 dias) e oferecer consulta paga no sistema de agendamento; 1 falta impede a extensão de prazo, 2 faltas fazem perder o retorno gratuito. |
| RN5 | Em caso de indisponibilidade de agenda, estender o retorno para 60 dias (exceto se o reagendamento já estiver dentro de 30 ou 60 dias); em troca de modalidade com agenda dentro de 30 dias na modalidade original, não é permitido estender para 60. |
| RN6 | Havendo agenda dentro de 60 dias com o mesmo profissional, ofertar a primeira agenda nesse prazo; se psiquiatria e o paciente recusar, contatar o supervisor para abrir Consulta Relacionamento. |
| RN7 | Se o paciente recusar a primeira agenda dentro de 60 dias, informar que perderá o retorno gratuito e ofertar consulta normal (paga) no sistema de agendamento. |
| RN8 | Se o paciente exigir passar em retorno dentro de 30 dias, abrir Retorno Relacionamento Médico. |
| RN9 | Se não houver agenda dentro de 60 dias, verificar agenda do profissional em outro centro médico mais próximo do paciente. |
| RN10 | Havendo agenda em outro centro médico próximo, ofertar o retorno lá. |
| RN11 | Se o paciente exigir passar no mesmo centro médico, abrir Retorno Relacionamento Médico. |
| RN12 | Se não houver agenda ou o paciente recusar ir a outro centro médico, abrir Retorno Relacionamento Médico com outro profissional da mesma especialidade e ofertar agendas. |
| RN13 | Se o paciente desejar passar com o mesmo profissional e no mesmo centro médico dentro de 30 dias, avisar o supervisor para abrir Consulta Relacionamento. |
| RN14 | Havendo indicação de retorno com outro profissional no sistema de agendamento (seta laranja), agendar retorno “normal”; só se nem o médico indicado nem o profissional da consulta original tiverem agenda, agendar Retorno Relacionamento Médico. |
| RN15 | Se o retorno já estiver marcado, mas houve atraso de exame dentro da consulta “DC” realizada dentro de 30 dias, é possível reagendar. |
