'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');

  var showSuccesMessage = function () {
    var messageTemplate = document.querySelector('#success').content.querySelector('.success');
    var main = document.querySelector('main');
    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);
    document.querySelector('body').classList.add('modal-open');
  };

  var showErrorMessage = function () {
    var messageTemplate = document.querySelector('#error').content;
    var main = document.querySelector('main');
    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);
    document.querySelector('body').classList.add('modal-open');
  };

  var successEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, removeSuccesMessage);
  };

  var successEnterPressHandler = function (evt) {
    window.utils.isEscEvent(evt, removeSuccesMessage);
  };

  var errorEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, removeErrorMessage);
  };

  var errorEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, removeErrorMessage);
  };

  var removeSuccesMessage = function () {
    document.querySelector('.success').remove();
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('click', removeSuccesMessage);
    document.removeEventListener('keydown', successEscapePressHandler);
    document.removeEventListener('keydown', successEnterPressHandler);
  };

  var removeErrorMessage = function () {
    document.querySelector('.error').remove();
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', errorEscapePressHandler);
    document.removeEventListener('keydown', errorEnterPressHandler);
  };

  var successHandler = function () {
    window.forms.closeUploadImage();
    showSuccesMessage();
    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', removeSuccesMessage);
    document.addEventListener('click', removeSuccesMessage);
    document.addEventListener('keydown', successEnterPressHandler);
    document.addEventListener('keydown', successEscapePressHandler);
  };

  var errorHandler = function () {
    window.forms.closeUploadImage();
    showErrorMessage();
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', removeErrorMessage);
    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', errorEscapePressHandler);
    document.removeEventListener('keydown', errorEnterPressHandler);
  };

  var submitFormHandler = function (evt) {
    evt.preventDefault();
    sendForm();
  };

  var sendForm = function () {
    if (window.forms.checkHashtagsValidity()) {
      window.transition.sendData(new FormData(form), successHandler, errorHandler);
      window.forms.closeUploadImage();
      window.forms.reset();
    }
  };

  form.addEventListener('submit', submitFormHandler);

  window.submit = {
    sendForm: sendForm,
    errorMessage: showErrorMessage
  };
})();
