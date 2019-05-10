'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addItem = function(item) {
    this.items.push(item);
    item.expanded = false;
  };

  const deleteItem = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleAddExpand = function() {
    this.addExpand = !this.addExpand;
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
    toggleAddExpand,
    setMinStars,
    setTargetBookmarkExpand,
  };

}());