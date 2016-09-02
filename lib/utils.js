'use strict';

const GoogleMapsAPI = require('googlemaps');
const request = require('request');
const Q = require('q');

module.exports = {
	gm_request: function(query) {
		let deferred = Q.defer();

		let options = {
			url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
			qs: {
				key: 'AIzaSyACrLqYc6QaCvHOGKkZeXkZcNbCS0RdVxo',
				query: query,
				location: '37.5529676,126.9742382',
				radius: 5000
			},
			json: true
		};

		request.get(options, function(err, res, data) {
			if(err) deferred.reject(err);
			else deferred.resolve(data);
		});

		return deferred.promise;
	}
}
