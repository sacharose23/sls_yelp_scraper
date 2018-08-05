// PURPOSE OF LAUNCH.JS:
// iterates over the array and launch a scraper for each element in the array

const request = require('request-promise');
const AWS = require('aws-sdk');

// array of business names to scrape
// url's from biz page on yelp
const list = [
  "haute-cakes-caffe-newport-beach",
  "dory-deli-newport-beach",
  "pho-lantern-cafe-costa-mesa-17"
];

function deployScraper(businessName) {
  // create a lambda client
  // lambda instance
  const lambda = new AWS.Lambda({
    // configuration object
    // on local machines, we use AWS CLI to configure our 
    // machines to have our AWS credentials
    // but a remote server will not! 
    // look at AWS docs to figure this out how to include our AWS credentials
    region: "us-west-2"
  });

  const params = {
    // params gives the configuration we need to invoke our lambda
    // information that'll be fed in
    FunctionName: "yelp-scraper-dev-scrape", 
    InvocationType: "RequestResponse", // capitalization is important
    LogType: "Tail", // a bunch of info will be given
    Payload: JSON.stringify(businessName) 
  };

  return lambda.invoke(params, function(error, data) {
    if(error) {
      // check for an error
      console.error(JSON.stringify(error));
      // back ticks for a template string
      return new Error(`Error scraping ${JSON.stringify(error)}`);
    } else if(data) {
      // takes care of a success case
      console.log(data)
      return JSON.stringify(data);
    }
  })
}

// iterate over the array and call the deployScraper function 
// for every element in the array
// like our loop
function swarm(arr) {
  arr.forEach(businessName => {
    deployScraper(businessName);
  });
}

// invoke swarm and give it the list of business names
swarm(list);