'use strict';

(function () {
  // Загрузка изображения

  var uploadButton = document.querySelector('#upload-file');
  var imageForm = document.querySelector('.img-upload__overlay');
  var image = imageForm.querySelector('.img-upload__preview');

  var imageEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeUploadImage);
  };
  
  var resetForm = function () {
    form.querySelector('.img-upload__input').value = '';
    window.effects.resetFilter();
    form.querySelector('.text__hashtags').value = '';
    form.querySelector('.text__description').value = '';
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
    resetForm();
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

  hashtagsField.addEventListener('blur', blurHashtagsInputHandler);

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

  window.forms = {
    closeUploadImage: closeUploadImage,
    checkHashtagsValidity: checkHashtagsValidity
  };
})();
