# Fluxo de Atendimento de Retorno

Ferramenta de tela única que guia a equipe de atendimento de uma clínica, por perguntas de **Sim ou Não**, até saber o que fazer com um pedido de retorno médico. Feita com **HTML, CSS e JavaScript puro** — sem frameworks, bibliotecas, build ou dependências.

O problema: as regras de retorno são muitas, se cruzam (prazo, especialidade, faltas, cancelamento, disponibilidade de agenda) e ficavam espalhadas num documento corrido. Durante o atendimento, ninguém lê documento corrido. Aqui a atendente responde a uma sequência curta de perguntas e chega a uma ação única e sem ambiguidade.

> **Protótipo.** Foi construído a partir das regras de uma operação real, mas nunca entrou em uso. Este repositório é uma versão anonimizada: nomes de instituição, sistemas e contatos foram substituídos por termos genéricos, e os dados de exemplo são fictícios. Não é material oficial de nenhuma clínica.

---

## Funcionalidades

- **Três pontos de entrada**, escolhidos no início do atendimento: `Retorno padrão`, `Reagendamento` e `Especialidade restrita`
- **Árvore de decisão** de 20 nós, cada um com uma pergunta de Sim/Não, levando a um dos 13 desfechos possíveis
- **Desfecho em linguagem direta** — a tela diz a ação a tomar, não um código de regra que a atendente teria que traduzir
- **Avisos intermediários**: alguns caminhos exibem uma informação que precisa ser lida antes de o fluxo continuar
- **Voltar** passo a passo, desfazendo uma resposta por vez sem perder o caminho já percorrido
- **Reiniciar** a qualquer momento, pelo botão fixo no cabeçalho
- **Card lateral de atenção** com os casos que não viram pergunta, porque dependem do que a atendente já tem na tela antes de começar

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura da tela única |
| CSS3 | Layout em duas colunas, custom properties e responsividade |
| JavaScript (ES5+) | Dados do fluxo, máquina de estados e renderização |

Nenhuma instalação ou build é necessária.

## Como executar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.

```bash
git clone <url-do-repositorio>
cd return-flow-prototype
# abra o index.html no navegador
```

> Dica: no VS Code, a extensão **Live Server** recarrega a página automaticamente a cada alteração.

## Como usar

1. Escolha o tipo de retorno no card central.
2. Responda `Sim` ou `Não` a cada pergunta.
3. Leia e confirme eventuais avisos intermediários com `Continuar`.
4. Ao chegar no desfecho, o card mostra **O que fazer**.
5. Use `← Voltar` para refazer a última resposta, ou `Novo atendimento` para começar outro caso.

## Estrutura do projeto

```
return-flow-prototype/
├── index.html              # Tela única: cabeçalho, card do fluxo e card de avisos
├── css/
│   └── style.css           # Layout em duas colunas, paleta e responsividade
├── docs/
│   ├── plan.md             # Planejamento inicial e divisão dos arquivos
│   └── fluxo-atendimento.md # Regras completas: desfechos, árvore e anexo
├── js/
│   ├── flow.js             # DADOS: nós da árvore e tipos de retorno
│   ├── resultado.js        # DADOS: desfechos possíveis e a ação de cada um
│   ├── engine.js           # LÓGICA: máquina de estados e histórico
│   ├── ui.js               # APRESENTAÇÃO: desenha a tela a partir do estado
│   └── main.js             # Liga as peças e inicializa
└── README.md
```

## Como funciona

A separação central do projeto é **dado de um lado, lógica do outro**. Quem precisar corrigir uma regra mexe em `flow.js` ou `resultado.js` e não encosta na máquina de estados.

### Os dados

Cada nó da árvore é uma pergunta com duas saídas:

```js
'T3-PSI-Q1': {
  pergunta: 'Há indicação de retorno no sistema de agendamento (seta azul)...?',
  sim: { setFlag: 'NUNCA_TROCAR', proximo: 'T4-J1' },
  nao: { proximo: 'T3-PSI-Q2' }
}
```

Uma saída pode levar a outro nó (`proximo`), encerrar em um desfecho (`resultado`), mostrar um aviso antes de seguir (`info`), ligar uma marca de estado (`setFlag`) ou deixar a decisão para a engine (`dynamic`).

### A máquina de estados

`engine.js` guarda o nó atual e aplica o efeito de cada saída. Dois casos não cabiam na saída direta:

| Mecanismo | Para quê |
| --- | --- |
| `setFlag` + `overrides` | A marca `NUNCA_TROCAR` liga quando o caso entra por exceção clínica de Psiquiatria. Enquanto ativa, todo desfecho que trocaria de profissional vira "acionar a supervisão" — sem duplicar a árvore inteira para esse cenário |
| `dynamic: 'confirmacao'` | O desfecho de confirmação depende dessa mesma marca, então é resolvido na hora (`P24` com a marca ativa, `P02` sem) |

O **Voltar** é consequência do desenho: cada transição empilha uma cópia do estado, então voltar é só um `pop` da pilha.

Principais métodos de `Engine`:

| Método | Responsabilidade |
| --- | --- |
| `iniciar(tipoId)` | Entra na árvore pelo nó de entrada do tipo escolhido |
| `responder(sim)` | Segue a saída de Sim ou Não, aplicando marcas e substituições |
| `continuar()` | Avança depois de um aviso intermediário |
| `voltar()` | Desempilha o estado anterior |
| `reiniciar()` | Volta à seleção de tipo e limpa o histórico |

### A tela

`ui.js` lê o estado e **redesenha o card inteiro** a cada mudança, sem guardar nada por conta própria. A tela é sempre um reflexo do estado da engine, nunca uma segunda cópia dele.

## Decisões de projeto

- **Sem build e sem dependências**: os cinco scripts entram no HTML com `defer`, na ordem de dependência. O projeto precisa rodar abrindo um arquivo, em máquina de trabalho onde instalar coisas nem sempre é possível.
- **Namespace único** `window.RF`, com cada arquivo em uma IIFE, para não espalhar variáveis globais sem precisar de módulos.
- **Nem toda regra virou pergunta.** As que dependem do que a atendente já vê na tela antes de começar ficaram no card lateral de avisos — transformá-las em nó obrigaria a perguntar sempre, inclusive nos atendimentos em que não se aplicam.
- **Os desfechos não usam sigla interna.** O texto diz o que fazer; quem está no telefone não deveria ter que decorar código de regra.

## Limitações conhecidas

- **Não há persistência**: o atendimento vive em memória e recarregar a página reinicia o fluxo. É intencional — cada ligação é um caso novo.
- **As regras estão embutidas no código**, não vêm de uma API ou arquivo de configuração. Mudança de regra exige editar `flow.js` ou `resultado.js`.
- **Sem testes automatizados**: os caminhos da árvore foram conferidos manualmente contra `docs/fluxo-atendimento.md`.
- Uma premissa do documento de regras (item 8) ficou marcada como **pendente de confirmação** e nunca foi validada, já que o projeto não chegou a ser usado.

## Próximos passos

- [ ] Testes automatizados percorrendo todos os caminhos da árvore até os 13 desfechos
- [ ] Carregar as regras de um JSON externo, separando conteúdo de código
- [ ] Botão para copiar o desfecho, para colar no registro do atendimento
- [ ] Busca por palavra-chave, para chegar direto a um desfecho conhecido
- [ ] Revisão de acessibilidade: foco visível, navegação por teclado e leitura por leitor de tela

---

Projeto desenvolvido para fins de estudo e portfólio.
