'use strict';

(function () {
  var COMMENTS_LIMIT = 5;
  var commentsContainer = document.querySelector('.social__comments');
  var pictureBig = document.querySelector('.big-picture');
  var commentsCounter = pictureBig.querySelector('.social__comment-count');
  var commentsLoader = pictureBig.querySelector('.comments-loader');
  var commentsCopy = [];
  var count = 0;

  var renderCommentsCounterBlock = function (loadedComments) {
    commentsCounter.textContent = '';
    var commentsCountBlockContent = loadedComments + ' из <span class="comments-count">' + count +
      '</span> комментариев';
    commentsCounter.insertAdjacentHTML('afterbegin', commentsCountBlockContent);
  };

  var createCommentTemplate = function (comment) {
    return '<li class="social__comment">' +
      '<img class="social__picture" width="35" height="35" src="' + comment.avatar + '" alt="' + comment.name + '">' +
      '<p class="social__text">' + comment.message + '</p>' +
      '</li>';
  };

  var renderComments = function (comments) {
    comments.forEach(function (comment) {
      var htmlComment = createCommentTemplate(comment);
      commentsContainer.insertAdjacentHTML('beforeend', htmlComment);
    });

    renderCommentsCounterBlock(commentsContainer.querySelectorAll('.social__comment').length);
  };

  var renderCommentsList = function (photo) {
    commentsCopy = photo.comments.slice();
    count = photo.comments.length;

    if (commentsCopy.length > COMMENTS_LIMIT) {
      commentsCounter.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');

      renderComments(commentsCopy.splice(0, COMMENTS_LIMIT));
    } else {
      commentsCounter.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      renderComments(commentsCopy);
    }
  };

  var commentsLoaderClickHandler = function () {
    renderComments(commentsCopy.splice(0, COMMENTS_LIMIT));

    if (commentsCopy.length === 0) {
      commentsLoader.classList.add('hidden');
    }
  };

  var removeComments = function () {
    while (commentsContainer.firstChild) {
      commentsContainer.firstChild.remove();
    }
  };

  window.comments = {
    commentsLoaderClickHandler: commentsLoaderClickHandler,
    renderList: renderCommentsList,
    remove: removeComments
  };
})();
