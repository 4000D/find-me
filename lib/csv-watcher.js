#!/usr/local/bin/node
'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const chokidar = require('chokidar');
const utils = require('./utils');
const async = require('async');
const Q = require('q');

const promiseFinally = require('promise.prototype.finally');
promiseFinally.shim(); // let's use Promise.finally!

const mongoose = require('mongoose');
mongoose.Promise = Q.Promise;

mongoose.connect('mongodb://localhost/find_me');
let db = mongoose.connection;
db.once('connect', function() {
	console.log('mongodb connected');
})

const MLOutputModel = require('../models/MLOutputModel');

console.log('csv-watcher is online');

let files = fs.readdirSync(__dirname + '/../mloutputs/not-processed/');

Promise.all(files.map( file => {
	let path = __dirname + '/../mloutputs/not-processed/' + file;

	if(fs.statSync(path).isDirectory()) return Promise.resolve()
	utils.process_csv_file(file);
}))
	.then( results => {
		console.log(results);
	})

	.catch( err => {
		console.error('files.map fails!');
		console.error(err);
	})

	.finally( () => {
		let watcher = chokidar.watch(__dirname + '/../mloutputs/not-processed/', {ignored: /^\./, persistent: true});
		console.log('watcher is on');

		watcher
			.on('add', function (path) {
				console.log(`Added: ${path}`);

				let file = path.split('/').pop();

				utils.process_csv_file(file);
			});
	});

// async.each(files, function(file, callback) {
// 	let path = __dirname + '/../mloutputs/not-processed/' + file;
//
// 	if(fs.statSync(path).isDirectory()) {
// 		callback()
// 	} else {
// 		utils.process_csv_file(file, callback);
// 	}
// }, function(err) {
// 	if(err) console.error('async.each fails!');
// 	else 		console.log('async.each success!');
//
// 	// 기존에 존재하던 CSV 파일들 처리 완료
// 	let watcher = chokidar.watch(__dirname + '/../mloutputs/not-processed/', {ignored: /^\./, persistent: true});
//
// 	watcher
// 		.on('add', function (path) {
// 			console.log(`Added: ${path}`);
// 		});
// });
