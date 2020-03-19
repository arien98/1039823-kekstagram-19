'use strict';

(function () {
  var fillCard = function (photoObj) {
    var cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var card = cardTemplate.cloneNode(true);
    card.setAttribute('id', photoObj.id);
    card.querySelector('.picture__img').src = photoObj.url;
    card.querySelector('.picture__comments').textContent = photoObj.comments.length;
    card.querySelector('.picture__likes').textContent = photoObj.likes;
    console.log(card);
    return card;
  };

  var renderCards = function (data) {
    var fragment = document.createDocumentFragment();
    var photosContainer = document.querySelector('.pictures');
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(fillCard(data[i]));
    }
    photosContainer.appendChild(fragment);
  };
  renderCards(window.transition);

})();
