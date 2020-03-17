'use strict';

(function () {
  var imageForm = document.querySelector('.img-upload__overlay');
  var pin = imageForm.querySelector('.effect-level__pin');
  var barInput = imageForm.querySelector('.effect-level__value');
  var effectDepth = imageForm.querySelector('.effect-level__depth');
  var ratio;

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
      var parentWidth = evt.target.parentNode.offsetWidth;

      if (position < 0) {
        position = 0;
        return;
      }

      if (position > parentWidth) {
        position = parentWidth;
        return;
      }

      ratio = Math.round(position / parentWidth * 100);
      pin.style.left = position + 'px';
      effectDepth.style.width = ratio + '%';
      barInput.value = ratio;
      window.slider = ratio;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pin.addEventListener('mousedown', sliderMoveHandler);
})();
