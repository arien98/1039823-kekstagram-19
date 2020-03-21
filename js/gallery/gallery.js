'use strict';

(function () {
  var fillCard = function (photoObj, id) {
    var cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var card = cardTemplate.cloneNode(true);
    card.setAttribute('id', id);
    card.querySelector('.picture__img').src = photoObj.url;
    card.querySelector('.picture__comments').textContent = photoObj.comments.length;
    card.querySelector('.picture__likes').textContent = photoObj.likes;
    return card;
  };

  var renderCards = function (data) {
    var fragment = document.createDocumentFragment();
    var photosContainer = document.querySelector('.pictures');
    data.forEach(function (element, index) {
      fragment.appendChild(fillCard(element, index));
    });
    photosContainer.appendChild(fragment);
  };

  window.gallery = renderCards;
})();
