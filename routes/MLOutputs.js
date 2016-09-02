var express = require('express');
var router = express.Router();
var MLOutputController = require('../controllers/MLOutputController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    MLOutputController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    MLOutputController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    MLOutputController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    MLOutputController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    MLOutputController.remove(req, res);
});

module.exports = router;
