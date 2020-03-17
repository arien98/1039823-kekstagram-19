'use strist';

(function () {
  var shift;
  var moveHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
    };

    var moveMouseHandler = function (moveEvt) {
      moveEvt.preventDefault();

      shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var position = pin.offsetLeft - window.slider.shift;
      switch (true) {
        case position < minLevel:
          pin.style.left = minLevel + 'px';
          return;
        case position > evt.target.parent.style.width:
          pin.style.left = maxLevel + 'px';
          return;
        default:
          pin.style.left = (pin.offsetLeft - window.slider.shift) + 'px';
    };
    };

    var upMouseHandler = function (upEvt) {
      upEvt.preventDefault();

      

      document.removeEventListener('mousemove', moveMouseHandler);
      document.removeEventListener('mouseup', upMouseHandler);
    };

    document.addEventListener('mousemove', moveMouseHandler);
    document.addEventListener('mouseup', upMouseHandler);
  };

  window.slider = {
    moveHandler: moveHandler,
    shift: shift
  };
})();