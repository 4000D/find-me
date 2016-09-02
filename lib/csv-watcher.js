#!/usr/local/bin/node
'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const utils = require('./utils');
const async = require('async');

const GoogleMapsAPI = require('googlemaps');

const googlePublicConfig = {
	key: 'AIzaSyACrLqYc6QaCvHOGKkZeXkZcNbCS0RdVxo',
	stagger_time:       1000, // for elevationPath
	encode_polylines:   false,
	secure:             true, // use https
}

const gmAPI = new GoogleMapsAPI(googlePublicConfig);

let predicted_sign_names = [];

console.log('csv-watcher is online');

fs.createReadStream(__dirname + '/../mloutouts/sample.csv')
	.pipe(csv())

	.on('data', function (data) {
		this.push(data.OUTPUT);
	}.bind(predicted_sign_names))

	.on('unpipe', function () {
		Promise.all(predicted_sign_names.map(
			predicted_sign_name => utils.gm_request(predicted_sign_name)
		))
			.then(results => { // results := [ { html_attributions, results: [ {} ] } ]
				console.log(results);
			})
	})

/*
utils.gm_request('Chef Diary')
	.then( res => {
		console.log('GoogleAPI Request Result: ', res);
	})

	.catch( err => {
		console.error('GoogleAPI Request Error: ', err);
	})
*/
