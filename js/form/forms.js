'use strict';

(function () {
  var uploadButton = document.querySelector('#upload-file');
  var imageForm = document.querySelector('.img-upload__overlay');
  var image = imageForm.querySelector('.img-upload__preview');
  var hashtagsField = document.querySelector('.text__hashtags');
  var descriptionField = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAGS_REX_EXP = /^#[a-zA-Zа-яА-Я1-9]{1,19}$/;
  var validityMessage = '';
  var validityColors = {
    border: 'red',
    background: '#FDD'
  };
  var userMessage = {
    lessThanFive: 'Нельзя указать больше пяти хэш-тегов',
    noDuplicates: 'Один и тот же хэш-тег не может быть использован дважды',
    correct: 'Неверный формат хештега'
  };

  var imageEscapePressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeUploadImage);
  };

  var imageEnterPressHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.submit.sendForm();
    });
  };

  var resetForm = function () {
    form.querySelector('.img-upload__input').value = '';
    hashtagsField.value = '';
    descriptionField.value = '';
    hashtagsField.style.borderColor = '';
    hashtagsField.style.backgroundColor = '';
    window.effects.resetFilter();
  };

  var showUploadImage = function () {
    imageForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    image.className = 'img-upload__preview ' + window.utils.filter.none.className;
    uploadButton.blur();
  };

  var closeUploadImage = function () {
    imageForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', imageEscapePressHandler);
    imageForm.querySelector('#upload-cancel').removeEventListener('click', closeUploadImage);
    document.removeEventListener('keydown', imageEnterPressHandler);
    resetForm();
  };

  var checkHashtagsValidity = function () {
    var hashtagsArr = hashtagsField.value.split(' ').filter((function (item) {
      return item !== '';
    }));

    var checkHashtagCorrect = hashtagsArr.every(function (item) {
      return HASHTAGS_REX_EXP.test(item);
    });

    var checkHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    var checkHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

    if (!checkHashtagCorrect) {
      validityMessage = userMessage.correct;
    }
    if (!checkHastagsNoDuplicates) {
      validityMessage = userMessage.noDuplicates;
    }
    if (!checkHashtagsLessThanFive) {
      validityMessage = userMessage.lessThanFive;
    }
    return checkHashtagCorrect && checkHastagsNoDuplicates && checkHashtagsLessThanFive;
  };


  var blurHashtagsInputHandler = function (evt) {
    if (checkHashtagsValidity()) {
      hashtagsField.style.borderColor = '';
      hashtagsField.style.backgroundColor = '';
      evt.target.setCustomValidity('');
    } else {
      hashtagsField.style.borderColor = validityColors.border;
      hashtagsField.style.backgroundColor = validityColors.background;
      evt.target.setCustomValidity(validityMessage);
    }
  };

  uploadButton.addEventListener('change', function () {
    showUploadImage();
    imageForm.querySelector('#upload-cancel').addEventListener('click', closeUploadImage);
    document.addEventListener('keydown', imageEnterPressHandler);
    document.addEventListener('keydown', imageEscapePressHandler);
  });

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
    checkHashtagsValidity: checkHashtagsValidity,
    reset: resetForm
  };
})();
