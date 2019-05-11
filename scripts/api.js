'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL= 'https://thinkful-list-api.herokuapp.com/erind';

  /**
   * listApiFetch - Wrapper function for native `fetch` to standardize error handling. 
   * @param {string} url 
   * @param {object} options 
   * @returns {Promise} - resolve on all 2xx responses with JSON body
   *                    - reject on non-2xx and non-JSON response with 
   *                      Object { code: Number, message: String }
   */
  const listApiFetch = function(...args) {
    // setup var in scope outside of promise chain
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // if response is not 2xx, start building error object
          error = { code: res.status };

          // if response is not JSON type, place Status Text in error object and
          // immediately reject promise
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }

        // otherwise, return parsed JSON
        return res.json();
      })
      .then(data => {
        // if error exists, place the JSON message into the error object and 
        // reject the Promise with your error object so it lands in the next 
        // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
        // will respond with a JSON object containing message key
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        // otherwise, return the json as normal resolved Promise
        return data;
      });
  };


  let getItems= function(){
    //This method will GET request on /bookmarks and return a promise
    return listApiFetch(`${BASE_URL}/bookmarks`);
  };

  let createItems= function(title, url, desc, rating) {
  //This method will POST request on /bookmarks with a JSON request body and return a promise
    let newItem = JSON.stringify({ title, url, desc, rating: parseInt(rating, 10) });
    return listApiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: newItem,
    });
  };

  let deleteItems= function(id) {
  //This method will DELETE request on /bookmarks/id and return a promise
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    getItems,
    createItems,
    deleteItems,
  };

}());