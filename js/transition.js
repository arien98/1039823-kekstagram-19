'use strict';

(function () {
  var usedUrl = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SEND: 'https://js.dump.academy/kekstagram'
  };
  var usedMethod = {
    LOAD: 'GET',
    SEND: 'POST'
  };
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var xhr;

  var sendRequest = function (method, url, successHandler, errorHandler) {
    xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open(method, url);
  };

  var loadData = function (onSuccess, errorHandler) {
    sendRequest(usedMethod.LOAD, usedUrl.LOAD, onSuccess, errorHandler);
    xhr.send();
  };

  var sendData = function (data, successHandler, errorHandler) {
    sendRequest(usedMethod.SEND, usedUrl.SEND, successHandler, errorHandler);
    xhr.send(data);
  };

  window.transition = {
    getData: loadData,
    sendData: sendData
  };
})();
