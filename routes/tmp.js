var express = require('express');
var router = express.Router();

router.get('/history', function (req, res) {
    res.status(200).json({
      data: [
        {
          final_result: {
            image_name: 'Chef Diary',
            location: {
              lat: 37.5529676,
              lng: 126.9742382
            }
          },

          candidates: [
            {
              image_name: 'candi1',
              location: {
                lat: 37.5529646,
                lng: 126.9742382
              }
            },
            {
              image_name: 'candi2',
              location: {
                lat: 37.5529676,
                lng: 126.9742322
              }
            },
            {
              image_name: 'candi3',
              location: {
                lat: 37.5529672,
                lng: 126.9742324
              }
            },
            {
              image_name: 'candi4',
              location: {
                lat: 37.5529616,
                lng: 126.9742325
              }
            },
          ]
        },

        {
          final_result: {
            image_name: 'final2',
            location: {
              lat: 37.5529676,
              lng: 126.9742382
            }
          },

          candidates: [
            {
              image_name: 'candi2-1',
              location: {
                lat: 37.5529646,
                lng: 126.9742382
              }
            },
            {
              image_name: 'candi2-2',
              location: {
                lat: 37.5529676,
                lng: 126.9742322
              }
            },
            {
              image_name: 'candi2-3',
              location: {
                lat: 37.5529672,
                lng: 126.9742324
              }
            },
            {
              image_name: 'candi2-4',
              location: {
                lat: 37.5529616,
                lng: 126.9742325
              }
            },
          ]
        },

        {
          final_result: {
            image_name: 'final3',
            location: {
              lat: 37.5529676,
              lng: 126.9742382
            }
          },

          candidates: [
            {
              image_name: 'candi3-1',
              location: {
                lat: 37.5529646,
                lng: 126.9742382
              }
            },
            {
              image_name: 'candi3-2',
              location: {
                lat: 37.5529676,
                lng: 126.9742322
              }
            },
            {
              image_name: 'candi3-3',
              location: {
                lat: 37.5529672,
                lng: 126.9742324
              }
            },
            {
              image_name: 'candi3-4',
              location: {
                lat: 37.5529616,
                lng: 126.9742325
              }
            },
          ]
        },


      ]
    });
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
