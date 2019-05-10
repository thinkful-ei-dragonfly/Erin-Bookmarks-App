'use strict';

/* global store, $ */

const bookmarks = (function() {

  //LATER: insert error handling functions

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
      <li class="bookmark" data-item-id="${item.id}">
        <span class="bookmark-item"></span>
        <h3>${item.title}</h3>
        <p>${stars}</p>
        <button type="button" class="expand-me">Expand</button>
      </li>
      `;}
    else {
      return `
      <li class="bookmark" data-item-id="${item.id}">
        <span class="bookmark-item"></span>
        <h3>${item.title}</h3>
            <button type="button" class="bookmarkLink">Visit Page</button>
            <button type="button" class="delete">Delete</button>
            <button type="button" class="return">Return to list view</button>
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
    return $(item)
      .closest('.bookmark')
      .data('item-id');
  }

  //CLEAN UP RENDER FUNCTION!
  function render() {
    //LATER: render error

    //set variable for bookmarks array
    //filter minStars
    //addExpand?
    //inserts html for generateBookmarksString
    let items = [...store.items];

    if (store.minStars) {
      let filteredItems = items.filter(item => item.rating >= store.minStars);
      items = filteredItems;
    }
    let bookmarkData;
    if (!store.addExpand) {
      bookmarkData = `
        <button type="button" class="initialAdd">Add Bookmark</button>`;}
    else {
      bookmarkData = `
      <form id="expanded-add-bookmark">
        <input type="text" class="addTitle" name="addTitle" placeholder="Add title here" required>
        <input type="text" class="addURL" name="addURL" placeholder="Add URL here" required>
        <input type="text" class="addDesc" name="addDesc" placeholder="Add description here"><br>
        <input type="radio" name="rating" value="one-star" checked>1 star<br>
        <input type="radio" name="rating" value="two-stars">2 stars<br>
        <input type="radio" name="rating" value="three-stars">3 stars<br>
        <input type="radio" name="rating" value="four-stars">4 stars<br>
        <input type="radio" name="rating" value="five-stars">5 stars<br>
        <button type="submit" class="bookmarkAdd">Add</button>
        <button type="button" class="bookmarkCancel">Cancel</button>
      </form>`;}

    let bookmarkString = generateBookmarkString(items);
    $('.add-bookmark-container').html(bookmarkData);
    $('.bookmark-container').html(bookmarkString);
  }
   

  //Event Listeners

  function handleAddBookmarkExpand() {
    //Listens for submit on .initial-add
    //prevents default behavior
    //runs toggleAddExpand for store.addExpand property
    //render
    $('.add-bookmark-container').on('click', '.initialAdd', event => {
      store.setAddExpand(true);
      render();
    });
  }

  function handleAddBookmark() {
    //Listens for submit on .bookmarkAdd
    //prevents default behavior
    //creates variables with new item title, url, desc, & rating, & passes into API method
    //Calls api.createItems, which calls store.addItem function & toggleAddExpand for store.addExpand property
    //render
  }

  function handleCancelBookmarkExpand() {
    //Listens for submit on .add-bookmark-container for target button .return
    //prevents default behavior
    //runs store.setAddExpand function and sets to false
    //render
    $('.add-bookmark-container').on('click', '.bookmarkCancel', event => {
      store.setAddExpand(false);
      render();
    });
  }

  function handleSelectBookmark() {
    //Listens for submit on #bookmark-container for target button .expand-me
    //prevents default behavior
    //toggles target bookmark's expanded property with store.targetBookmarkExpand
    //render
    $('.bookmark-container').on('click', '.expand-me', event => {
      let id = getItemId(event.currentTarget);
      store.setTargetBookmarkExpand(id);
      render();
    });
  }

  function handleReturnListView() {
    $('.bookmark-container').on('click', '.return', event => {
      let id = getItemId(event.currentTarget);
      store.setTargetBookmarkExpand(id);
      render();
    });
  }

  function handleDeleteBookmark() {
    //Listens for submit on target #expanded-bookmark's button .delete
    //prevents default behavior
    //creates variable with target item ID, passes into API method
    //calls api.deleteItems, which calls store.deleteItem function
    //render
  }

  function handleSetRating() {
    //listens for selection on dropdown (if statements?)
    //sets value of minStars property with store.setMinStars function
    //render
    $('#rating-filter').on('change', event => {
      let starRatingString = $(event.target).val();
      let starRating = parseInt(starRatingString);
      store.setMinStars(starRating);
      render();
      console.log(store.minStars);
    });
  }

  function bindEventListeners() {
    getItemId();
    handleAddBookmarkExpand();
    handleAddBookmark();
    handleCancelBookmarkExpand();
    handleSelectBookmark();
    handleDeleteBookmark();
    handleSetRating();
    handleReturnListView();
  }

  return {
    bindEventListeners,
    render,
  };

}());