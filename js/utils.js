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
      measure: '0.01',
      unit: ''
    },
    sepia: {
      className: 'effects__preview--sepia',
      type: 'sepia',
      measure: '0.01',
      unit: ''
    },
    marvin: {
      className: 'effects__preview--marvin',
      type: 'invert',
      measure: '1',
      unit: '%'
    },
    phobos: {
      className: 'effects__preview--phobos',
      type: 'blur',
      measure: '0.03',
      unit: 'px'
    },
    heat: {
      className: 'effects__preview--heat',
      type: 'brightness',
      measure: '0.03',
      unit: ''
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action();
    }
  };

  var getRandomNumber = function (min, max) {
    var number = Math.floor(Math.random() * max);
    return number < min ? min : number;
  };

  window.utils = {
    ESCAPE_KEY: ESCAPE_KEY,
    filter: filter,
    isEscEvent: isEscEvent,
    getRandomNumber: getRandomNumber
  };
})();

