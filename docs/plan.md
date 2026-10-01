## Projeto de fluxo de retorno, com HTML, css e JavaScript

Será um sistema para agilizar o atendimento dos colaboradores com relação ao fluxo de retorno médico, será usado somente html, css e js

# HTML E CSS
- Em termos visuais será somente uma tela, o design deve ser simples
- HEADER terá somente uma logo ao lado esquerdo, a príncípio criar somente o espaço para a logo, deverá ter 100x100 porém será redonda então adicionar border-radius
- MAIN terá o campo de interação com o colaborador, terá um card ao lado esquerdo que terá: o tipo de retorno (retorno padrão, reagendamento e (obstetricia, pediatria ou psiquiatria)), após a escolha irá começar as perguntas, então os tipos de retorno deverão sumir e ficaram somente as perguntas e os botões de sim ou não para que o sistema possa prosseguir para a próxima pergunta e um botão pequeno acima de "voltar"
- ao lado direito do main terá um espaço somente com esses textos *"Caso o paciente informe que tem direito a mais de 1 retorno porquê fez uma cirurgia, direciona-lo para a central de cirurgia - 99 9 9999-9999."* e *"Caso o paciente informe que o médico liberou um retorno adicional, verificar com a supervisão se existe a indicação em sistema e acionar o time interno para o agendamento."*
- Ainda no MAIN mas em outra section, deverá apresentar o texto informativo para o colaborador repassar ao paciente
- No rodapé terá a frase *"Material NÃO oficial, em caso de dúvidas consultar a FAQ interna de regras de retorno


# JavaScript

- No arquivo flow.js,só terá dados, sem lógica. Cada nó da Parte 2 vira um objeto: pergunta, e para cada resposta (sim/não) um proximo (outro nó) ou um resultado
- no arquivo resultado.js terá os RESULTADOs da Parte 1: ação de sistema + resposta padrão (com os placeholders {data}, {profissional} etc.).
- no arquivo engine.js terá a máquina de estados: nó atual, função responder(sim|nao) que consulta o flow, avança (ou fecha em um resultado), pilha de histórico para o botão "voltar".
- no arquivo ui.js — pega o estado atual do engine e desenha na tela (pergunta, botões Sim/Não, tela de resultado).
- main.js — importa os outros três, liga os cliques, inicializa.