'use strict';

const bookmarks = (function() {

  function render() {

  };

  //Event Listeners

  function handleAddBookmarkExpand() {
    //Listens for submit on .initial-add
    //prevents default behavior
    //Toggles addExpand property
    //render
  }

  function handleAddBookmark() {
    //Listens for submit on .bookmarkAdd
    //prevents default behavior
    //creates variable with new item name, passes into API method
    //Calls api.createItems, which calls store.addItem function
    //render
  }

  function handleCancelBookmark() {
    //Listens for submit on target #expanded-add-bookmark's input class .bookmarkCancel
    //prevents default behavior
    //
  }

  function handleSelectBookmark() {
    //Listens for submit on target .initial-bookmark-container's ul class .bookmark
    //prevents default behavior
    //Toggles target bookmark's expanded property
    //render
  }

  function handleDeleteBookmark() {
    //Listens for submit on target #expanded-add-bookmark's input .bookmarkCancel
    //prevents default behavior
    //creates variable with target item ID, passes into API method
    //Calls api.deleteItems, which calls store.deleteItem function
    //render
  }

  return {
    handleAddBookmarkExpand,
    handleAddBookmark,
    handleCancelBookmark,
    handleSelectBookmark,
    handleDeleteBookmark,
  };

}());