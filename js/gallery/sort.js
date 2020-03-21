'use strict';

(function () {
  var RANDOM_PHOTOS_AMOUNT = 11;
  var filters = document.querySelector('.img-filters');
  var filterButtons = filters.querySelectorAll('.img-filters__button');
  var userPictures = document.querySelector('.pictures');

  var onError = function () {
    window.submit.errorMessage();
  };

  var onSuccess = function (serverData) {
    window.sort = {
      originData: serverData,
      sortedData: serverData
    };
    sortData();
  };

  window.transition.getData(onSuccess, onError);

  var sortData = function () {
    var data = window.sort.originData.slice();

    var getDefaultPhotos = function () {
      return data;
    };

    var getRandomPhotos = function () {
      var randomPhotos = [];
      while (randomPhotos.length < RANDOM_PHOTOS_AMOUNT) {
        var i = window.utils.getRandomNumber(0, data.length - 1);

        if (randomPhotos.every(function (photo) {
          return data[i].url !== photo.url;
        })) {
          randomPhotos.push(data[i]);
        }
      }
      return randomPhotos;
    };

    var getDiscussedPhotos = function () {
      return data.slice().sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    };

    var filterButtonMap = {
      'filter-default': getDefaultPhotos,
      'filter-random': getRandomPhotos,
      'filter-discussed': getDiscussedPhotos
    };

    var removeActiveClass = function () {
      filterButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
    };

    var clearPictures = function () {
      var photos = userPictures.querySelectorAll('.picture');

      photos.forEach(function (photo) {
        userPictures.removeChild(photo);
      });
    };

    var filterButtonClickHandler = function (evt) {
      clearPictures();
      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');
      window.sort.sortedData = filterButtonMap[evt.target.id]();
      window.gallery(window.sort.sortedData);
    };

    window.gallery(window.sort.sortedData);
    filters.classList.remove('img-filters--inactive');
    filterButtons.forEach(function (button) {
      button.addEventListener('click', window.debounce(filterButtonClickHandler));
    });
  };
})();
