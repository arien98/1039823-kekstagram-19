'use strict';

(function () {
  // Масштабирование изображения

  var scale = document.querySelector('.scale');
  var scaleInput = document.querySelector('.scale__control--value');
  var scaleInputNumber = parseInt(scaleInput.value, 10);
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var scaleParam = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%'
  };

  var setScaleValue = function (value) {
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    scaleInput.value = value + scaleParam.MEASURE;
  };

  function clickScaleButtonHandler(evt) {
    if (
      evt.target.classList.contains('scale__control--bigger') &&
      scaleInputNumber < scaleParam.MAX
    ) {
      scaleInputNumber += scaleParam.STEP;
    }

    if (
      evt.target.classList.contains('scale__control--smaller') &&
      scaleInputNumber > scaleParam.MIN
    ) {
      scaleInputNumber -= scaleParam.STEP;
    }

    setScaleValue(scaleInputNumber);
  }

  scale.addEventListener('click', clickScaleButtonHandler);
})();
