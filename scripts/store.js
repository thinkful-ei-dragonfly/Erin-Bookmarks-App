'use strict';

const store = (function() {

  function addItem(item) {
    this.bookmarks.push(item);
  }

  function deleteItem(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id === id);
  }

  return {
    bookmarks: [],
    addExpand: false,
    error: null,
    minStars: null,

    addItem,
    deleteItem,
  };

}());