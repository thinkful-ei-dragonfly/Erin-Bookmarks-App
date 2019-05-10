'use strict';

/* global bookmarks, store, api */

$(document).ready(function() {
  bookmarks.bindEventListeners();

  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarks.render();
    })
    .catch(err => console.log(err.message));
});



