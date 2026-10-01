/*
 * Máquina de estados do fluxo de atendimento.
 * Consome os dados de flow.js (nós/arestas) e resultado.js (desfechos),
 * mantém o nó atual, aplica os efeitos de cada aresta e guarda um
 * histórico de estados para permitir o botão "Voltar".
 */
(function () {
  'use strict';

  function estadoInicial() {
    return {
      tipoId: null,
      atual: null,
      resultado: null,
      info: null,
      infoProximo: null,
      flags: { nuncaTrocar: false }
    };
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function resolverEdge(edge, estado) {
    if (edge.overrides) {
      for (var i = 0; i < edge.overrides.length; i++) {
        var ov = edge.overrides[i];
        if (ov.flag === 'NUNCA_TROCAR' && estado.flags.nuncaTrocar) return ov;
      }
    }
    return edge;
  }

  function resolverConfirmacao(estado) {
    return estado.flags.nuncaTrocar ? 'P24' : 'P02';
  }

  function Engine(flow, tiposRetorno, resultados) {
    this.flow = flow;
    this.tiposRetorno = tiposRetorno;
    this.resultados = resultados;
    this.state = estadoInicial();
    this.historico = [];
  }

  Engine.prototype.iniciar = function (tipoId) {
    var tipo = null;
    for (var i = 0; i < this.tiposRetorno.length; i++) {
      if (this.tiposRetorno[i].id === tipoId) { tipo = this.tiposRetorno[i]; break; }
    }
    if (!tipo) return;

    this.historico.push(clone(this.state));
    var novo = estadoInicial();
    novo.tipoId = tipoId;
    novo.atual = tipo.entrada;
    this.state = novo;
  };

  Engine.prototype.responder = function (sim) {
    var nodeDef = this.flow[this.state.atual];
    if (!nodeDef) return;
    var edge = sim ? nodeDef.sim : nodeDef.nao;

    this.historico.push(clone(this.state));
    var novo = clone(this.state);

    if (edge.setFlag === 'NUNCA_TROCAR') novo.flags.nuncaTrocar = true;

    var resolved = resolverEdge(edge, novo);

    if (resolved.dynamic === 'confirmacao') {
      novo.atual = null;
      novo.resultado = resolverConfirmacao(novo);
    } else if (resolved.resultado) {
      novo.atual = null;
      novo.resultado = resolved.resultado;
    } else if (resolved.info) {
      novo.atual = null;
      novo.info = resolved.info;
      novo.infoProximo = resolved.proximo;
    } else if (resolved.proximo) {
      novo.atual = resolved.proximo;
    }

    this.state = novo;
  };

  Engine.prototype.continuar = function () {
    if (!this.state.info) return;
    this.historico.push(clone(this.state));
    var novo = clone(this.state);
    novo.atual = novo.infoProximo;
    novo.info = null;
    novo.infoProximo = null;
    this.state = novo;
  };

  Engine.prototype.voltar = function () {
    if (!this.historico.length) return;
    this.state = this.historico.pop();
  };

  Engine.prototype.reiniciar = function () {
    this.state = estadoInicial();
    this.historico = [];
  };

  window.RF = window.RF || {};
  window.RF.Engine = Engine;
})();
