'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;
  var xhr;

  var sendRequest = function () {
    var onError = function (message) {
      console.error(message);
    };
    var onSuccess = function (data) {
      // console.log(data);
    };

    xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('GET', URL);
    xhr.send();
  };
  window.transition = sendRequest();
})();
