'use strict';

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

// Полноразмерное фото

var bigPicture = document.querySelector('.big-picture');
var body = document.querySelector('body');

var hideBigPictureElements = function () {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

var showBigPicture = function (object) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').src = object.url;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;
  bigPicture.querySelector('.social__caption').textContent = object.description;
  bigPicture.querySelector('.social__comments').appendChild(createComments(object));
  body.classList.add('modal-open');
};

var fillComment = function (photoObject) {
  var commentPattern = document.querySelector('.social__comment');
  var comment = commentPattern.cloneNode(true);
  comment.querySelector('.social__picture').src = photoObject.avatar;
  comment.querySelector('.social__picture').alt = photoObject.name;
  comment.querySelector('.social__text').textContent = photoObject.message;
  return comment;
};

var createComments = function (object) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < object.comments.length; i++) {
    fragment.appendChild(fillComment(object.comments[i]));
  }
  return fragment;
};

hideBigPictureElements();
showBigPicture(photosData[0]);

// Загрузка изображения

var ESCAPE_KEY = 'Escape';
var uploadButton = document.querySelector('#upload-file');
var imageForm = document.querySelector('.img-upload__overlay');

var utils = {
  isEscEvent: function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action();
    }
  }
};

var imageEscapePressHandler = function (evt) {
  utils.isEscEvent(evt, closeUploadImage);
};

var showUploadImage = function () {
  imageForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
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

// Применение эффекта к изображению

var effectIcons = imageForm.querySelectorAll('.effects__radio');
var image = imageForm.querySelector('.img-upload__preview');
var effectLevel = imageForm.querySelector('.effect-level__value');

var moveMouseEffectHandler = function (object) {
  var line = imageForm.querySelector('.effect-level');
  line.addEventListener('mouseup', function (evt) {
    effectLevel.value = Math.round(evt.offsetX / line.clientWidth * 100);
    applyFilter(object, effectLevel.value);
  });
};

var applyFilter = function (effect, level) {
  if (effect.value === 'none') {
    image.style.filter = 'none';
  }
  if (effect.value === 'chrome') {
    var x = 'grayscale(' + level + '%)';
    image.style.filter = x;
  }
  if (effect.value === 'sepia') {
    x = 'sepia(' + level + '%)';
    image.style.filter = x;
  }
  if (effect.value === 'marvin') {
    x = 'invert(' + level + '%)';
    image.style.filter = x;
  }
  if (effect.value === 'phobos') {
    x = 'blur(' + level / 100 * 3 + 'px)';
    image.style.filter = x;
  }
  if (effect.value === 'heat') {
    x = 'brightness(' + level / 100 * 3 + ')';
    image.style.filter = x;
  }
};

var pressEffectButtonHandler = function (item) {
  item.addEventListener('change', function () {
    effectLevel.value = 0;
    image.style = 'none';
    image.className = 'img-upload__preview effects__preview--' + item.value;
    if (item.value === 'none') {
      imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      imageForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
      moveMouseEffectHandler(item);
    }
  });
};

for (var i = 0; i < effectIcons.length; i++) {
  pressEffectButtonHandler(effectIcons[i]);
}
