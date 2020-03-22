'use strict';

(function () {
  var imageForm = document.querySelector('.img-upload__overlay');
  var pin = imageForm.querySelector('.effect-level__pin');
  var barInput = imageForm.querySelector('.effect-level__value');
  var effectDepth = imageForm.querySelector('.effect-level__depth');
  var ratio;

  var sliderMoveHandler = function (evt) {
    var startX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startX - moveEvt.clientX;

      startX = moveEvt.clientX;
      var position = pin.offsetLeft - shift;
      var parentWidth = evt.target.parentNode.offsetWidth;

      if (position < 0) {
        position = 0;
      }

      if (position > parentWidth) {
        position = parentWidth;
      }

      ratio = Math.round(position / parentWidth * 100);
      pin.style.left = position + 'px';
      effectDepth.style.width = ratio + '%';
      barInput.value = ratio;
      window.slider = ratio;
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  pin.addEventListener('mousedown', sliderMoveHandler);
})();
