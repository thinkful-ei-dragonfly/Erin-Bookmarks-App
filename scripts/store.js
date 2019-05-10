'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addItem = function(item) {
    item.expanded = false;
    this.items.push(item);
  };

  const deleteItem = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const setAddExpand = function(expanded) {
    this.addExpand = expanded;
  };

  const setMinStars = function(val) {
    this.minStars = val;
  };

  const setTargetBookmarkExpand = function(id) {
    let item = this.items.find(item => item.id === id);
    item.expanded = !item.expanded;
  };

  return {
    items: [],
    addExpand: false,
    error: null,
    minStars: null,

    addItem,
    deleteItem,
    setAddExpand,
    setMinStars,
    setTargetBookmarkExpand,
  };

}());