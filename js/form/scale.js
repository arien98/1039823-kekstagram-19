'use strict';

(function () {
  var scale = document.querySelector('.scale');
  var scaleInput = document.querySelector('.scale__control--value');
  var scaleInputNumber = parseInt(scaleInput.value, 10);
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleParams = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%'
  };

  var setScaleValue = function (value) {
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    scaleInput.value = value + scaleParams.MEASURE;
  };

  var clickScaleButtonHandler = function (evt) {
    var ratio = (evt.target.classList.contains('scale__control--bigger') && scaleInputNumber < scaleParams.MAX)
      ? +1
      : 0;
    ratio = (evt.target.classList.contains('scale__control--smaller') && scaleInputNumber > scaleParams.MIN)
      ? -1
      : 0;

    scaleInputNumber += scaleParams.STEP * ratio;

    setScaleValue(scaleInputNumber);
  };

  scale.addEventListener('click', clickScaleButtonHandler);
})();
