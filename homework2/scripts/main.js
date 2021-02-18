/*jslint browser:true*/
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;
var TINY_EFFECT_CLASS = 'is-tiny';

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

//for hw#2

function getImagesArray() {
//makes the thumbnails into an iterable array
  "use strict";
  var imgs = getThumbnailsArray();
  for (var i = 0; i < imgs.length; i++) {
    imgs[i] = imgs[i].href;
  }
  return imgs;
}

function prev() { //will fetch the previous image
  'use strict';
  var thumbs = getImagesArray();
  var thumbArray = getThumbnailsArray();
  var curThumb = thumbs.indexOf(document.getElementById("detail-image").src);
  if (curThumb == 0) {
    curThumb = imgArray.length - 1;
  } else {
    curThumb = curThumb - 1;
  }
  thumbArray[curThumb].click();
}

function next() { //will fetch the next image
  'use strict';
  var thumbs = getImagesArray();
  var thumbArray = getThumbnailsArray();
  var curThumb = thumbs.indexOf(document.getElementById("detail-image").src);
  if (curThumb == 6) {
    curThumb = 0;
  } else {
    curThumb = curThumb + 1;
  }
  thumbArray[curThumb].click();
}

function initializeEvent() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    //for hw#2
    document.getElementById("prev").addEventListener("click", function (event) {
        event.preventDefault();
        prev();
    });
    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();
        next();
    });
}

initializeEvent();

