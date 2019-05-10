'use strict';

/* global store, $ */

const bookmarks = (function() {

  function generateBookmarkElement(item) {
    //returns html for given item
    let stars;
    if (item.rating === 5) {
      stars = '<p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>';
    }
    else if (item.rating === 4) {
      stars = '<p>&#9733;&#9733;&#9733;&#9733;</p>';
    }
    else if (item.rating === 3) {
      stars = '<p>&#9733;&#9733;&#9733;</p>';
    }
    else if (item.rating === 2) {
      stars = '<p>&#9733;&#9733;</p>';
    }
    else if (item.rating === 1) {
      stars = '<p>&#9733;&#9733</p>';
    }
    else {
      stars = '';
    }


    if (!item.expanded) {
      return `
      <li class="bookmark">
        <span class="bookmark-item"></span>
        <h3>${item.title}</h3>
        <p>${stars}</p>
      </li>
      `;}
    else {
      return `
      <li class="bookmark">
        <span class="bookmark-item"></span>
        <h3>${item.title}</h3>
        <form id="expanded-bookmark">
            <button type="submit" class="bookmarkLink">Visit Page</button>
            <button type="submit" class="delete">Delete</button>
        </form>
        <p>${stars}</p>
        <p>${item.desc}</p>
      </li>`;}
  }

  function generateBookmarkString(items) {
    //map on generateBookmarkElement(bookmarks)
    //join bookmarks array
    const bookmarks = items.map((item) => generateBookmarkElement(item));
    return bookmarks.join('');
  }

  function getItemId(item) {
  }

  function render() {
    //LATER: render error

    //set variable for bookmarks array
    //filter minStars
    //addExpand?
    //inserts html for generateBookmarksString
    let items = [...store.items];
    let bookmarkString = generateBookmarkString(items);

    if (store.minStars) {
      items = items.filter(item => item.rating >= store.minStars);
    }

    $('.bookmark-container').html(bookmarkString);
  }
   

  //Event Listeners

  function handleAddBookmarkExpand() {
    //Listens for submit on .initial-add
    //prevents default behavior
    //runs toggleAddExpand for store.addExpand property
    //render
    // ('.initial-add').on('submit', event => {
    //   event.preventDefault();
    //   store.toggleAddExpand();
    //   render();
    // });
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
    //listens for selection on dropdown
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