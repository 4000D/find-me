#!/usr/local/bin/node
'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const GoogleMapsAPI = require('googlemaps');

const googlePublicConfig = {
	key: 'AIzaSyACrLqYc6QaCvHOGKkZeXkZcNbCS0RdVxo',
	stagger_time:       1000, // for elevationPath
	encode_polylines:   false,
	secure:             true, // use https
}

const gmAPI = new GoogleMapsAPI(googlePublicConfig);

console.log('csv-watcher is online');

fs.createReadStream(__dirname + '/../mloutouts/sample.csv')
	.pipe(csv())
	.on('data', function (data) {
		console.log('OUTPUT: %s', data.OUTPUT);
	});


var geocodeParams = {
  "address":    "121, Curtain Road, EC2A 3AD, London UK",
  "components": "components=country:GB",
  "bounds":     "55,-1|54,1",
  "language":   "en",
  "region":     "uk"
};

gmAPI.geocode(geocodeParams, function(err, result){
	if(err) console.console.error('Error: ', err);
  console.log(result);
});
