var express = require('express');
var router = express.Router();
var APIResponseController = require('../controllers/APIResponseController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    APIResponseController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    APIResponseController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    APIResponseController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    APIResponseController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    APIResponseController.remove(req, res);
});

module.exports = router;
