const request = require('request-promise');

// since we are importing an npm package, we don't need ./ before request-promise
// nodejs knows to search the node_modules folder

module.exports = businessName => {
  // construct a business page URL
  // https://www.yelp.com/biz/the-last-bookstore-los-angeles
  // flexible URL that takes a biz name and construct a unique URL 
  // need template strings
  const url = `https://www.yelp.com/biz/${businessName}`;
  return request({ method: 'GET', url: url });
  // request takes in a configuration object
  // declare the method & specify the URL
};