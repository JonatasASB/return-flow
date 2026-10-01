/*
 * Ponto de entrada: junta flow.js, resultado.js, engine.js e ui.js e inicializa a tela.
 */
(function () {
  'use strict';

  var engine = new window.RF.Engine(window.RF.flow, window.RF.tiposRetorno, window.RF.resultados);
  window.RF.UI.init(engine);
})();
