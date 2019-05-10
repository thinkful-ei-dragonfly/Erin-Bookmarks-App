'use strict';

/* global store, api, $ */

// eslint-disable-next-line no-unused-vars
const bookmarks = (function() {

  function generateBookmarkElement(item) {
    //returns html for given item
    let stars;
    if (item.rating === 5) {
      stars = '&#9733;&#9733;&#9733;&#9733;&#9733;';
    }
    else if (item.rating === 4) {
      stars = '&#9733;&#9733;&#9733;&#9733;';
    }
    else if (item.rating === 3) {
      stars = '&#9733;&#9733;&#9733;';
    }
    else if (item.rating === 2) {
      stars = '&#9733;&#9733;';
    }
    else if (item.rating === 1) {
      stars = '&#9733;&#9733';
    }
    else {
      stars = '';
    }


    if (!item.expanded) {
      return `
      <li class="bookmark" data-item-id="${item.id}">
        <span class="bookmark-item"></span>
        <h3>${item.title}</h3>
        <p class="stars">${stars}</p>
        <button type="button" class="expand-me">Expand</button>
      </li>
      `;}
    else {
      return `
      <li class="bookmark" data-item-id="${item.id}">
        <span class="bookmark-item"></span>
          <h3>${item.title}</h3>
          <hr>
          <button type="button" class="delete">Delete</button>
          <button type="button" class="return">Return to list view</button>
          <a href="${item.url}" class="link" target="_blank">Visit Page</a>
        <p class="stars">${stars}</p>
        <p class="desc">${item.desc}</p>
      </li>`;}
  }

  function generateBookmarkString(items) {
    //map on generateBookmarkElement(bookmarks)
    //join bookmarks array
    const bookmarks = items.map((item) => generateBookmarkElement(item));
    return bookmarks.join('');
  }

  function generateAddBookmarkString() {
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
        <select name="add-rating" class="add-rating">
          <option value="1" class ="option-1">1 Star</option>
          <option value="2" class ="option-2">2 Stars</option>
          <option value="3" class ="option-3">3 Stars</option>
          <option value="4" class ="option-4">4 Stars</option>
          <option value="5" class ="option-5">5 Stars</option>
        </select>
        <button type="submit" class="bookmarkAdd">Add</button>
        <button type="button" class="bookmarkCancel">Cancel</button>
      </form>`;}
    return bookmarkData;
  }

  function getItemId(item) {
    return $(item)
      .closest('.bookmark')
      .data('item-id');
  }

  function generateError(message) {
    return `
    <p>${message}</p>
      <form id="error-message">
          <button type="submit" class="cancelError">Cancel</button>
      </form>
      `;
  }

  function renderError() {
    let error = generateError(store.error);
    if (store.error) {
      $('.error-container').innerHTML= this.error;
    }
    else {
      $('.error-container').empty();
    }
    return error;
  }

  function render() {
    //LATER: render error

    //set variable for bookmarks array
    //filter minStars
    //addExpand
    //inserts html for generateBookmarksString
    let items = [...store.items];

    if (store.minStars) {
      let filteredItems = items.filter(item => item.rating >= store.minStars);
      items = filteredItems;
    }

    let bookmarkData = generateAddBookmarkString();
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
    $('.add-bookmark-container').on('submit', '#expanded-add-bookmark', event => {
      event.preventDefault();
      let title = $('.addTitle').val();
      let url = $('.addURL').val();
      let desc = $('.addDesc').val();
      let rating = $('.add-rating').val();
      
      api.createItems(title, url, desc, rating)
        .then(res => res.json())
        .then((newItem) => {
          store.addItem(newItem);
          store.setAddExpand(false);
          render();
        })
        .catch((err) => {
          //console.log(err);
          store.setError(err.message);
          renderError();
        });
    });
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
    $('.bookmark-container').on('click', '.delete', event => {
      let id = getItemId(event.currentTarget);

      api.deleteItems(id)
        .then(() => {
          store.deleteItem(id);
          render();
        })
        .catch((err) => {
          console.log(err);
          store.setError(err.message);
          renderError();
        });
    });
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