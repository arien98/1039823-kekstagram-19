'use strict';

(function () {
  // Применение эффекта к изображению
  var imageForm = document.querySelector('.img-upload__overlay');
  var effectsList = imageForm.querySelector('.effects__list');
  var image = imageForm.querySelector('.img-upload__preview');
  var pin = imageForm.querySelector('.effect-level__pin');
  var line = imageForm.querySelector('.effect-level__line');
  var effectDepth = imageForm.querySelector('.effect-level__depth');
  var sliderRange = {
    minLevel: 0,
    maxLevel: 450
  }
  var effect = 'none';

  var sliderMoveHandler = function (evt) {
    
    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      var position = pin.offsetLeft - shift.x;
      if (position < sliderRange.minLevel && position < sliderRange.maxLevel) {
        pin.style.left = sliderRange.minLevel + 'px';
        effectDepth.style.width = '0%';
        getFilterLevelValue();
        return;
      } else {
        if (position > sliderRange.maxLevel) {
          pin.style.left = sliderRange.maxLevel + 'px';
          effectDepth.style.width = '100%';
          getFilterLevelValue();
          return;
        } else {
          pin.style.left = (pin.offsetLeft - shift.x) + 'px';
          effectDepth.style.width = getFilterLevelValue() + '%';
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      pin.removeEventListener('mouseup', setEffectHandler);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    pin.addEventListener('mouseup', setEffectHandler);
  };

  var getFilterLevelValue = function () {
    var levelValue = (pin.offsetLeft / line.offsetWidth) * 100;
    return Math.round(levelValue);
  };

  var setEffectHandler = function () {
    console.log(window.utils.filter[effect].type + '(' + getFilterLevelValue() * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')');
    image.style.filter = window.utils.filter[effect].type + '(' + getFilterLevelValue() * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')';
  };

  var resetFilter = function () {
    image.style.filter = window.utils.filter[effect].type + '(' + 100 * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')';
  };

  var pressEffectButtonHandler = function (evt) {
    effect = evt.target.value;
    resetFilter();
    image.className = 'img-upload__preview ' + window.utils.filter[effect].className;
    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    if (evt.target.value !== 'none') {
      imageForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
      pin.addEventListener('mousedown', sliderMoveHandler);
    }
  };

  effectsList.addEventListener('change', pressEffectButtonHandler);
})();
