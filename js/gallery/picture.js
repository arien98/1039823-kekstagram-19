'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var photosContainer = document.querySelector('.pictures');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var showBigPicture = function (object) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = object.url;
    bigPicture.querySelector('.likes-count').innerHTML = object.likes;
    bigPicture.querySelector('.comments-count').textContent = object.comments.length;
    bigPicture.querySelector('.social__caption').textContent = object.description;

    window.comments.remove();
    window.comments.renderList(object);

    commentsLoader.addEventListener('click', window.comments.commentsLoaderClickHandler);
    body.classList.add('modal-open');
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    closeBigPictureButton.removeEventListener('click', closeBigPicture);
    document.removeEventListener('click', pictureEscapePressHandler);
  };

  var pictureEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  var renderBigPicture = function (pictureId) {
    var pictureData = window.sort.sortedData.find(function (elem, index) {
      return index === +pictureId;
    });
    showBigPicture(pictureData);
    closeBigPictureButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', pictureEscapePressHandler);
  };

  var clickPhotosContainerHandler = function (evt) {
    var clickedPicture = evt.target.closest('.picture');
    if (clickedPicture === null) {
      return;
    }
    renderBigPicture(clickedPicture.id);
  };

  photosContainer.addEventListener('click', clickPhotosContainerHandler);
})();
