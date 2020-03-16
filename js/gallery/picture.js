'use strict';

(function () {
  // Полноразмерное фото

  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var photosContainer = document.querySelector('.pictures');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

  var hideBigPictureElements = function () {
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  };

  var showBigPicture = function (object) {
    var comments = bigPicture.querySelector('.social__comments');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = object.url;
    bigPicture.querySelector('.comments-count').textContent = object.comments.length;
    bigPicture.querySelector('.social__caption').textContent = object.description;
    while (comments.firstChild) {
      comments.firstChild.remove();
    }
    comments.appendChild(createComments(object));
    body.classList.add('modal-open');
  };

  var fillComment = function (photoObject) {
    var commentPattern = document.querySelector('#comment').content;
    var comment = commentPattern.cloneNode(true);
    comment.querySelector('.social__picture').src = photoObject.avatar;
    comment.querySelector('.social__picture').alt = photoObject.name;
    comment.querySelector('.social__text').textContent = photoObject.message;
    return comment;
  };

  var createComments = function (object) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < object.comments.length; i++) {
      fragment.appendChild(fillComment(object.comments[i]));
    }
    return fragment;
  };

  hideBigPictureElements();

  // Клики по всем фоткам
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    closeBigPictureButton.removeEventListener('click', closeBigPicture);
    closeBigPictureButton.removeEventListener('click', pictureEscapePressHandler);
  };

  var pictureEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  var renderBigPicture = function (pictureId) {
    var pictureData = window.data.find(function (element) {
      return element.id === +pictureId;
    });
    showBigPicture(pictureData);
    closeBigPictureButton.addEventListener('click', closeBigPicture);
    closeBigPictureButton.addEventListener('keydown', pictureEscapePressHandler);
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
