'use strict';

const bookmarks = (function() {

  function generateBookmarkElement(item) {
    //returns html for given item
  }

  function generateBookmarkString(bookmarks) {
    //map on generateBookmarkElement(bookmarks)
    //join bookmarks array
  }

  function render() {
    //LATER: render error

    //set variable for bookmarks array
    //filters for addExpand, minStars
    //inserts html for generateBookmarksString
  }

  function getItemId(item) {
  }

  //Event Listeners

  function handleAddBookmarkExpand() {
    //Listens for submit on .initial-add
    //prevents default behavior
    //runs toggleAddExpand for store.addExpand property
    //render
  }

  function handleAddBookmark() {
    //Listens for submit on .bookmarkAdd
    //prevents default behavior
    //creates variables with new item title, url, desc, & rating, & passes into API method
    //Calls api.createItems, which calls store.addItem function & toggleAddExpand for store.addExpand property
    //render
  }

  function handleCancelBookmarkExpand() {
    //Listens for submit on target #expanded-add-bookmark's button .bookmarkCancel
    //prevents default behavior
    //runs store.toggleAddExpand function for store.addExpand property
    //render
  }

  function handleSelectBookmark() {
    //Listens for submit on target .initial-bookmark-container's ul class .bookmark
    //prevents default behavior
    //toggles target bookmark's expanded property with store.targetBookmarkExpand
    //render
  }

  function handleDeleteBookmark() {
    //Listens for submit on target #expanded-bookmark's button .delete
    //prevents default behavior
    //creates variable with target item ID, passes into API method
    //calls api.deleteItems, which calls store.deleteItem function
    //render
  }

  function handleSetRating() {
    //listens for selection on radio buttons --> ?
    //sets value of minStars property with store.setMinStars function
    //render
  }

  function bindEventListeners() {
    getItemId();
    handleAddBookmarkExpand();
    handleAddBookmark();
    handleCancelBookmarkExpand();
    handleSelectBookmark();
    handleDeleteBookmark();
    handleSetRating();
  }

  return {
    bindEventListeners,
    render,
  };

}());