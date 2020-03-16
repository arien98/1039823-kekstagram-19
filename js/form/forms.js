'use strict';

(function () {
  // Загрузка изображения


  var uploadButton = document.querySelector('#upload-file');
  var imageForm = document.querySelector('.img-upload__overlay');
  var image = imageForm.querySelector('.img-upload__preview');

  var imageEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeUploadImage);
  };

  var showUploadImage = function () {
    imageForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    image.className = 'img-upload__preview ' + window.utils.filter.none.className;
  };

  var closeUploadImage = function () {
    imageForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', imageEscapePressHandler);
  };

  uploadButton.addEventListener('change', function () {
    showUploadImage();
    imageForm.querySelector('#upload-cancel').addEventListener('click', closeUploadImage);

    document.addEventListener('keydown', imageEscapePressHandler);
  });

  // Валидация хэштэгов

  var hashtagsField = document.querySelector('.text__hashtags');
  var descriptionField = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var HASHTAGS_MAX_COUNT = 5;
  var validityColors = {
    border: 'red',
    background: '#FDD'
  };


  var checkHashtagsValidity = function () {
    var hashtagsArr = hashtagsField.value.split(' ').filter((function (item) {
      return item !== '';
    }));

    var isHashtagCorrect = hashtagsArr.every(function (item) {
      return /^#[a-zA-Z]{1,19}$/.test(item);
    });

    var isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    var isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

    return isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive;
  };


  var blurHashtagsInputHandler = function () {
    if (checkHashtagsValidity()) {
      hashtagsField.style.borderColor = '';
      hashtagsField.style.backgroundColor = '';
    } else {
      hashtagsField.style.borderColor = validityColors.border;
      hashtagsField.style.backgroundColor = validityColors.background;
    }
  };

  var submitFormHandler = function (evt) {
    evt.preventDefault();
    if (checkHashtagsValidity()) {
      // отправка формы
    }
  };


  hashtagsField.addEventListener('blur', blurHashtagsInputHandler);

  form.addEventListener('submit', submitFormHandler);

  hashtagsField.addEventListener('focus', function () {
    document.removeEventListener('keydown', imageEscapePressHandler);
  });

  hashtagsField.addEventListener('blur', function () {
    document.addEventListener('keydown', imageEscapePressHandler);
  });

  descriptionField.addEventListener('focus', function () {
    document.removeEventListener('keydown', imageEscapePressHandler);
  });

  descriptionField.addEventListener('blur', function () {
    document.addEventListener('keydown', imageEscapePressHandler);
  });
})();