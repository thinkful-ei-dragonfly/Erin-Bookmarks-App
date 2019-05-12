'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addItem = function(item) {
    item.expanded = false;
    item.editing = false;
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

  const setError = function(error) {
    this.error = error;
  };

  const setEdit = function(id, value) {
    let item = this.items.find(item => item.id === id);
    item.editing = value;
  };

  const setNewValues = function(id, newRating, newDesc) {
    let item = this.items.find(item => item.id === id);
    item.rating = parseInt(newRating);
    item.desc = newDesc;
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
    setError,
    setEdit,
    setNewValues,
  };

}());