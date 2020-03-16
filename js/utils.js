'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';

  var filter = {
    none: {
      className: 'effects__preview--none',
      type: '',
      measure: '',
      unit: ''
    },
    chrome: {
      className: 'effects__preview--chrome',
      type: 'grayscale',
      measure: '',
      unit: '%'
    },
    sepia: {
      className: 'effects__preview--sepia',
      type: 'sepia',
      measure: '',
      unit: '%'
    },
    marvin: {
      className: 'effects__preview--marvin',
      type: 'invert',
      measure: '',
      unit: '%'
    },
    phobos: {
      className: 'effects__preview--phobos',
      type: 'blur',
      measure: ' / 100 * 3',
      unit: 'px'
    },
    heat: {
      className: 'effects__preview--heat',
      type: 'brightnesss',
      measure: ' / 100 * 3',
      unit: ''
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action();
    }
  };

  window.utils = {
    ESCAPE_KEY: ESCAPE_KEY,
    isEscEvent: isEscEvent,
    filter: filter
  };
})();

