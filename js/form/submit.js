'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');

  var showSuccesMessage = function () {
    var messageTemplate = document.querySelector('#success').content.querySelector('.success');
    var main = document.querySelector('main');
    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);
  };

  var showErrorMessage = function () {
    var messageTemplate = document.querySelector('#error').content;
    var main = document.querySelector('main');
    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', removeErrorMessage);
    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', errorEscapePressHandler);
  };

  var successEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, removeSuccesMessage);
  };

  var errorEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, removeSuccesMessage);
  };

  var removeSuccesMessage = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('click', removeSuccesMessage);
    document.removeEventListener('keydown', successEscapePressHandler);
  };

  var removeErrorMessage = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', errorEscapePressHandler);
  };

  var onSuccess = function () {
    window.forms.closeUploadImage();
    showSuccesMessage();
    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', removeSuccesMessage);
    document.addEventListener('click', removeSuccesMessage);
    document.addEventListener('keydown', successEscapePressHandler);
  };

  var onError = function () {
    window.forms.closeUploadImage();
    showErrorMessage();
  };

  var submitFormHandler = function (evt) {
    evt.preventDefault();
    if (window.forms.checkHashtagsValidity()) {
      window.transition.sendData(new FormData(form), onSuccess, onError);
      window.forms.closeUploadImage();
    }
  };

  form.addEventListener('submit', submitFormHandler);

  window.submit = {
    errorMessage: showErrorMessage
  };
})();
