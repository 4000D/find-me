'use strict';

const GoogleMapsAPI = require('googlemaps');
const request = require('request');

const csv = require('csv-parser');
const fs = require('fs');

const Q = require('q');
const _ = require('lodash');

const mongoose = require('mongoose');
const MLOutputModel = require('../models/MLOutputModel');

module.exports = {
	gm_request: function(query) {
		let deferred = Q.defer();

		let options = {
			url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
			qs: {
				// key: 'AIzaSyACrLqYc6QaCvHOGKkZeXkZcNbCS0RdVxo',
				key: 'AIzaSyByOjjyuBVuv7xcG38u-S-pC0QgOsNKZMQ',
				query: query,
				location: '37.5529676,126.9742382',
				language: 'kr',
				radius: 5000
			},
			json: true
		};

		request.get(options, function(err, res, data) {
			if(err) deferred.reject(err);
			else deferred.resolve(data);
		});

		return deferred.promise;
	},

	/**
	 *
	 *	@param 	r1					Google Map API Text Search 결과1
	 *	@param 	r2					Google Map API Text Search 결과2
	 *	@param 	radius			같은 위치에서 찍은 결과라는 것을 판정할 반경
	 *
	 *	@return	ret					r1과 r2간에 raidus안에 존재하는 results​
	 */
	results_intersect: function(r1, r2, radius) {
		// if(r1.results.length > r2.results.length) [r1, r2] = [r2, r1];
		[r1, r2] = [r2, r1];

		let ret = [];
		let ret_ids = [];

		// for ... of 말고 forEach로 하니까 되네!
		r1.results.forEach( _r1 => {
			r2.results.forEach( _r2 => {
				if(!ret_ids.includes(_r1.place_id)) {
					let dist = this.gps_to_linear_distance(_r1.geometry.location, _r2.geometry.location);
					// console.log(`${_r1.name} ~ ${_r2.name} : ${dist}`);
					if(dist < radius) {
						ret.push({name: _r1.name, dist: dist, location: _r1.geometry.location, address: _r1.formatted_address});
						ret_ids.push(_r1.place_id);
					}
				}
			})
		});

		ret = _.sortBy(ret, e => e.dist);

		console.log(ret);

		return {final_result: ret[0], candidates: ret.slice(1)};
	},

	gps_to_linear_distance: function(loc1, loc2) {

		let R = 6371; // km
		let dLat = this.toRad(loc2.lat-loc1.lat);
		let dLon = this.toRad(loc2.lng-loc1.lng);
		let lat1 = this.toRad(loc1.lat);
		let lat2 = this.toRad(loc2.lat);

		let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		let d = R * c;

		return d;
	},

	/**
	 * degree to radian
	 *
	 * @param 	v		degree
	 *
	 * @return 			radian
	 */
	toRad: function(v) {
		return v * Math.PI / 180;
	},

	/**
	 * for each CSV file, apply Google Map API
	 *
	 * @param			 	file			csv file name
	 * @param 			callback
	 *
	 * @return 			null. callback is called
	 */
	process_csv_file: function(file) {
		let self = this;
		let path = __dirname + '/../mloutputs/not-processed/' + file;
		let csv_file_name = file;
		let image_file_name = file.split('.csv')[0] + '.png';
		let predicted_sign_names = [];

		console.log('processing ' + csv_file_name + '...');

		let pipe = fs.createReadStream(path)
			.pipe(csv())

			.on('data', function (data) {
				this.predicted_sign_names.push(data.OUTPUT);
			}.bind({predicted_sign_names: predicted_sign_names}))

			.on('unpipe', function () {
				return Promise.all(predicted_sign_names.map(
					predicted_sign_name => self.gm_request(predicted_sign_name)
				))
					.then( results => {
						// CSV 파일은 해더 한 라인, 상호명 두 라인, 총 3 라인으로 이루어짐!
						let {final_result, candidates} = self.results_intersect(results[0], results[1], 3000);
						let is_success = !!final_result;

						// DB에 저장!
						return new MLOutputModel({
							csv_file_name: this.csv_file_name,
							image_file_name: this.image_file_name,
							is_success: is_success,
							predicted_sign_names: this.predicted_sign_names,
							final_result: final_result,
							candidates: candidates
						}).save();
					})

					.then( MLOutput => {
						console.log('process success : ', MLOutput.csv_file_name);

						// 해당 csv파일 이동시키기
						let pre_path = __dirname + '/../mloutputs/not-processed/' + this.csv_file_name;
						let post_path = __dirname + '/../mloutputs/processed/' + this.csv_file_name;

						fs.renameSync(pre_path, post_path);

						return {file: csv_file_name, result: true};
					})

					.catch( err => {
						console.error('Error while processe');
						console.error(err);

						let pre_path = __dirname + '/../mloutputs/not-processed/' + this.csv_file_name;
						let post_path = __dirname + '/../mloutputs/error-processed/' + this.csv_file_name;

						fs.renameSync(pre_path, post_path);

						return {file: csv_file_name, result: false};
					})

			}.bind({csv_file_name: csv_file_name, image_file_name: image_file_name, predicted_sign_names: predicted_sign_names}))
	}
}
