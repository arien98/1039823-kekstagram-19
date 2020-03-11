'use strict';

(function () {
  var PHOTOS_COUNT = 25;

  var descriptionList = [
    'Радоваться в одиночку грустно.',
    'Джентльмен всегда делает вид, что верит даме, даже если он знает, что она говорит неправду.',
    'Все радости и несчастья людей созданы их собственными мыслями.',
    'В человеке должно быть все прекрасно: и лицо, и одежда, и душа, и мысли.',
    'Самый лучший способ что-то найти — это просто перестать искать, а самый лучший способ чего-то дождаться — перестать ждать…',
    'Что может быть полезнее, чем научиться жить наилучшим для себя образом?',
    'Все, что ни происходит, всегда так, как нужно, и только к лучшему.',
    'Богатым человека делает его сердце.',
    'Счастье не может быть громким. Оно тихое, уютное, родное.',
    'Доброго утра! Мечтайте сегодня и ставьте цели!',
    'Тот дом хорош, где хороши обитатели.',
    'Несколько часов ЖИЗНИ стоят дороже десятилетий существования.',
    'Какая разница, кто сильнее, кто умнее, кто красивее, кто богаче? Ведь, в конечном итоге, имеет значение только то, счастливый ли ты человек или нет.',
    'Одиночество — великая вещь, но не тогда, когда ты один.',
    'Если любишь радугу, люби и дождь.',
    'Брак — единственная война, во время которой вы спите с врагом.',
    'Этот шаг нужно обдумать и разрешить, но этот шаг, не из тех что обдумываются, а из тех на который просто решаются.',
    'Иногда нужно всё разрушить, спалить всё дотла, чтобы потом начать всё сначала.',
    'Смех – это солнце, которое гонит зиму с лица человека.',
    'Богаче всего тот человек, чьи радости требуют меньше всего денег.',
    'Счастье не надо искать — им надо быть.',
    'Приятно, когда есть рядом такие люди, которым не важно кто ты, а просто важно, что ты есть.',
    'Никогда не переставай верить в свою мечту...',
    'От большой любви рождаются красивые дети.',
    'Если ты хочешь, чтобы кто-то остался в твоей жизни, никогда не относись к нему равнодушно.'
  ];

  var commentsList = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var namesList = [
    'Артем',
    'Николай',
    'Олег',
    'Лена',
    'Катя',
    'Даша',
  ];

  var getRandomNumber = function (min, max) {
    var number = Math.floor(Math.random() * max);
    return number < min ? min : number;
  };

  var createComment = function () {
    return {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: commentsList[getRandomNumber(0, 5)],
      name: namesList[getRandomNumber(0, 5)]
    };
  };

  var createCard = function (index) {
    return {
      id: index + 1,
      url: 'photos/' + (index + 1) + '.jpg',
      description: descriptionList[getRandomNumber(0, 25)],
      likes: getRandomNumber(15, 200),
      comments: [createComment(), createComment(), createComment()]
    };
  };

  var createCardsData = function () {
    var photosData = [];
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      photosData.push(createCard(i));
    }
    return photosData;
  };

  var fillCard = function (photoObj) {
    var cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var card = cardTemplate.cloneNode(true);
    card.setAttribute('id', photoObj.id);
    card.querySelector('.picture__img').src = photoObj.url;
    card.querySelector('.picture__comments').textContent = photoObj.comments.length;
    card.querySelector('.picture__likes').textContent = photoObj.likes;
    return card;
  };

  var renderCards = function (data) {
    var fragment = document.createDocumentFragment();
    var photosContainer = document.querySelector('.pictures');
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(fillCard(data[i]));
    }
    photosContainer.appendChild(fragment);
  };

  var photosData = createCardsData();

  renderCards(photosData);

  window.data = {
    photosData: photosData
  };
})();
