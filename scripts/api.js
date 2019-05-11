'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL= 'https://thinkful-list-api.herokuapp.com/erind';

  let getItems= function(){
    //This method will GET request on /bookmarks and return a promise
    return fetch(`${BASE_URL}/bookmarks`);
  };

  let createItems= function(title, url, desc, rating) {
  //This method will POST request on /bookmarks with a JSON request body and return a promise
    let newItem = JSON.stringify({ title, url, desc, rating: parseInt(rating, 10) });
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: newItem,
    });
  };

  let deleteItems= function(id) {
  //This method will DELETE request on /bookmarks/id and return a promise
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    getItems,
    createItems,
    deleteItems,
  };

}());