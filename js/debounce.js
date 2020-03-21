'use strict';

(function () {

  var TIMEOUT = 50000;

  var lastTimeout = null;

  window.debounce = function (action) {

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(action, TIMEOUT);

  };

})();
