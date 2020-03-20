'use strict';

(function () {
  var usedUrl = {
    load: 'https://js.dump.academy/kekstagram/data',
    send: 'https://js.dump.academy/kekstagram'
  };
  var usedMethod = {
    load: 'GET',
    send: 'POST'
  };
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var xhr;

  var sendRequest = function (method, url, onSuccess, onError) {
    xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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
    xhr.open(method, url);
  };

  var loadData = function (onSuccess, onError) {
    sendRequest(usedMethod.load, usedUrl.load, onSuccess, onError);
    xhr.send();
  };

  var sendData = function (data, onSuccess, onError) {
    sendRequest(usedMethod.send, usedUrl.send, onSuccess, onError);
    xhr.send(data);
  };

  window.transition = {
    getData: loadData,
    sendData: sendData
  };
})();
