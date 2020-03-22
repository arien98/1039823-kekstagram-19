'use strict';

(function () {
  var keys = {
    ESCAPE_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

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

  var isEnterEvent = function (evt, action) {
    if (evt.key === keys.ENTER_KEY) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === keys.ESCAPE_KEY) {
      action();
    }
  };

  var getRandomNumber = function (min, max) {
    var number = Math.floor(Math.random() * max);
    return number < min ? min : number;
  };

  window.utils = {
    ESCAPE_KEY: keys.ESCAPE_KEY,
    filter: filter,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    getRandomNumber: getRandomNumber
  };
})();

