'use strict';

(function () {
  // Применение эффекта к изображению
  var imageForm = document.querySelector('.img-upload__overlay');
  var effectsList = imageForm.querySelector('.effects__list');
  var image = imageForm.querySelector('.img-upload__preview');
  var pin = imageForm.querySelector('.effect-level__pin');
  var line = document.querySelector('.effect-level__line');

  var sliderMoveHandler = function (evt, object) {
    console.log('press');
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      object.style.top = (object.offsetTop - shift.y) + 'px';
      object.style.left = (object.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var getFilterLevelValue = function () {
    var levelValue = (pin.offsetLeft / line.offsetWidth) * 100;
    return Math.round(levelValue);
  };

  var setEffect = function (evtSet) {
     pin.addEventListener('mouseup', function () {
      pin.addEventListener('mousedown', sliderMoveHandler(evtSet, pin));
    });
  };

  var pressEffectButtonHandler = function (evt) {
    image.className = 'img-upload__preview ' + window.utils.filter[evt.target.value].className;

    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    if (evt.target.value !== 'none') {
      imageForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
      setEffect();
    }
  };

  effectsList.addEventListener('change', pressEffectButtonHandler);
})();
