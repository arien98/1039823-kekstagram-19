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
  };
  var effect = 'none';

  var getFilterLevelValue = function () {
    var levelValue = (pin.offsetLeft / line.offsetWidth) * 100;
    return Math.round(levelValue);
  };

  var setEffect = function () {
    image.style.filter = window.utils.filter[effect].type + '(' + getFilterLevelValue() * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')';
  };

  var setPosition = function () {
    var position = pin.offsetLeft - window.slider.shift;
    switch (true) {
      case position < sliderRange.minLevel:
        pin.style.left = sliderRange.minLevel + 'px';
        effectDepth.style.width = '0%';
        getFilterLevelValue();
        return;
      case position > sliderRange.maxLevel:
        pin.style.left = sliderRange.maxLevel + 'px';
        effectDepth.style.width = '100%';
        getFilterLevelValue();
        return;
      default:
        pin.style.left = (pin.offsetLeft - window.slider.shift) + 'px';
        effectDepth.style.width = getFilterLevelValue() + '%';
    };
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
      pin.addEventListener('mousedown', window.slider.moveHandler);
      pin.addEventListener('mousedown', function () {
        var moveMouseHandler = function (moveEvt) {
          moveEvt.preventDefault();
          setPosition();
        };
    
        var upMouseHandler = function (upEvt) {
          upEvt.preventDefault();
          setEffect();
          document.removeEventListener('mousemove', moveMouseHandler);
          document.removeEventListener('mouseup', upMouseHandler);
        };
    
        document.addEventListener('mousemove', moveMouseHandler);
        document.addEventListener('mouseup', upMouseHandler);
      });
    }
  };

  effectsList.addEventListener('change', pressEffectButtonHandler);
})();
