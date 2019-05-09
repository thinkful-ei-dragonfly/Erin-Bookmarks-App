'use strict';

const store = (function() {

  function addItem(item) {
    this.bookmarks.push(item);
    this.bookmarks.expanded = false;
  }

  function deleteItem(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id === id);
  }

  function toggleAddExpand() {
    this.addExpand = !this.addExpand;
  }

  return {
    bookmarks: [],
    addExpand: false,
    error: null,
    minStars: null,

    addItem,
    deleteItem,
    toggleAddExpand,
  };

}());