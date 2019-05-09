'use strict';

const store = (function() {

  function addItem(item) {
    this.items.push(item);
    this.items.expanded = false;
  }

  function deleteItem(id) {
    this.items = this.items.filter(item => item.id === id);
  }

  function toggleAddExpand() {
    this.addExpand = !this.addExpand;
  }

  function setMinStars(val) {
    this.minStars = val;
  }

  function setTargetBookmarkExpand(id) {
    let item = this.items.find(item => item.id === id);
    item.expanded = !item.expanded;
  }

  return {
    items: [],
    addExpand: false,
    error: null,
    minStars: null,

    addItem,
    deleteItem,
    toggleAddExpand,
    setMinStars,
    setTargetBookmarkExpand,
  };

}());