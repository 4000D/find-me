var express = require('express');
var router = express.Router();
var BaseController = require('../controllers/BaseController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    BaseController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    BaseController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    BaseController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    BaseController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    BaseController.remove(req, res);
});

module.exports = router;
