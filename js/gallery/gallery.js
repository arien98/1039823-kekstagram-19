'use strict';

(function () {
  var fillCard = function (photoObj) {
    var cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var card = cardTemplate.cloneNode(true);
    card.setAttribute('id', photoObj.id);
    card.querySelector('.picture__img').src = photoObj.url;
    card.querySelector('.picture__comments').textContent = photoObj.comments.length;
    card.querySelector('.picture__likes').textContent = photoObj.likes;
    return card;
  };

  var renderCards = function (data) {
    var fragment = document.createDocumentFragment();
    var photosContainer = document.querySelector('.pictures');
    data.forEach(function (element) {
      fragment.appendChild(fillCard(element));
    });
    photosContainer.appendChild(fragment);
  };

  var onError = function (message) {
    console.error(message);
  };
  var onSuccess = function (data) {
    renderCards(data);
    window.gallery = data;
  };

  window.transition.getData(onSuccess, onError);
})();
