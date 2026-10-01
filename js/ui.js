/*
 * Camada de apresentação: lê o estado atual da engine e desenha a tela
 * (seleção de tipo, pergunta com Sim/Não, aviso intermediário ou resultado).
 */
(function () {
  'use strict';

  var engineRef = null;

  function el(tag, className, texto) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (texto !== undefined) node.textContent = texto;
    return node;
  }

  function botao(texto, className, onClick, disabled) {
    var btn = el('button', 'btn ' + className, texto);
    btn.type = 'button';
    if (disabled) btn.disabled = true;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderTudo() {
    renderCardFluxo();
  }

  function renderCardFluxo() {
    var container = document.getElementById('card-fluxo');
    container.innerHTML = '';
    var s = engineRef.state;

    if (!s.tipoId && !s.atual && !s.resultado && !s.info) {
      container.appendChild(renderSelecaoTipo());
      return;
    }

    var podeVoltar = engineRef.historico.length > 0;
    container.appendChild(botao('← Voltar', 'btn-voltar', function () {
      engineRef.voltar();
      renderTudo();
    }, !podeVoltar));

    if (s.info) {
      container.appendChild(renderInfo(s.info));
    } else if (s.resultado) {
      container.appendChild(renderResultadoResumo());
    } else if (s.atual) {
      container.appendChild(renderPergunta(s.atual));
    }
  }

  function renderSelecaoTipo() {
    var wrap = el('div', 'selecao-tipo');
    wrap.appendChild(el('h2', null, 'Qual o tipo de retorno?'));

    var lista = el('div', 'opcoes-tipo');
    engineRef.tiposRetorno.forEach(function (tipo) {
      lista.appendChild(botao(tipo.label, 'btn-tipo', function () {
        engineRef.iniciar(tipo.id);
        renderTudo();
      }));
    });
    wrap.appendChild(lista);

    return wrap;
  }

  function renderPergunta(nodeId) {
    var nodeDef = engineRef.flow[nodeId];
    var wrap = el('div', 'pergunta-wrap');
    wrap.appendChild(el('p', 'pergunta-texto', nodeDef.pergunta));

    var botoes = el('div', 'botoes-resposta');
    botoes.appendChild(botao('Sim', 'btn-sim', function () {
      engineRef.responder(true);
      renderTudo();
    }));
    botoes.appendChild(botao('Não', 'btn-nao', function () {
      engineRef.responder(false);
      renderTudo();
    }));
    wrap.appendChild(botoes);
    return wrap;
  }

  function renderInfo(codigo) {
    var r = engineRef.resultados[codigo];
    var wrap = el('div', 'info-wrap');
    wrap.appendChild(el('p', 'info-aviso', 'Aviso antes de prosseguir'));
    wrap.appendChild(el('p', 'info-texto', r.acao));
    wrap.appendChild(botao('Continuar', 'btn-continuar', function () {
      engineRef.continuar();
      renderTudo();
    }));
    return wrap;
  }

  function renderResultadoResumo() {
    var r = engineRef.resultados[engineRef.state.resultado];
    var wrap = el('div', 'resultado-resumo');
    wrap.appendChild(el('h2', null, 'O que fazer'));
    wrap.appendChild(el('p', 'resultado-texto', r.acao));
    wrap.appendChild(botao('Novo atendimento', 'btn-novo', function () {
      engineRef.reiniciar();
      renderTudo();
    }));
    return wrap;
  }

  window.RF = window.RF || {};
  window.RF.UI = {
    init: function (engine) {
      engineRef = engine;
      var btnReiniciarGlobal = document.getElementById('btn-reiniciar-global');
      if (btnReiniciarGlobal) {
        btnReiniciarGlobal.addEventListener('click', function () {
          engineRef.reiniciar();
          renderTudo();
        });
      }
      renderTudo();
    }
  };
})();
