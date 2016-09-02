const APIResponseModel = require('../models/APIResponseModel.js');

/**
 * APIResponseController.js
 *
 * @description :: Server-side logic for managing APIResponses.
 */
module.exports = {

    /**
     * APIResponseController.list()
     */
    list: function (req, res) {
        APIResponseModel.find(function (err, APIResponses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting APIResponse.',
                    error: err
                });
            }
            return res.json(APIResponses);
        });
    },

    /**
     * APIResponseController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        APIResponseModel.findOne({_id: id}, function (err, APIResponse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting APIResponse.',
                    error: err
                });
            }
            if (!APIResponse) {
                return res.status(404).json({
                    message: 'No such APIResponse'
                });
            }
            return res.json(APIResponse);
        });
    },

    /**
     * APIResponseController.create()
     */
    create: function (req, res) {
        let APIResponse = new APIResponseModel({    			input_string : req.body.input_string,    			base : {            lat: req.body.lat,            lng: req.body.lng          },    			response : req.body.response
        });

        APIResponse.save(function (err, APIResponse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating APIResponse',
                    error: err
                });
            }
            return res.status(201).json(APIResponse);
        });
    },

    /**
     * APIResponseController.update()
     */
    update: function (req, res) {
        let id = req.params.id;
        APIResponseModel.findOne({_id: id}, function (err, APIResponse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting APIResponse',
                    error: err
                });
            }
            if (!APIResponse) {
                return res.status(404).json({
                    message: 'No such APIResponse'
                });
            }

            APIResponse.input_string = req.body.input_string ? req.body.input_string : APIResponse.input_string;			APIResponse.base = req.body.base ? req.body.base : APIResponse.base;			APIResponse.response = req.body.response ? req.body.response : APIResponse.response;
            APIResponse.save(function (err, APIResponse) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating APIResponse.',
                        error: err
                    });
                }

                return res.json(APIResponse);
            });
        });
    },

    /**
     * APIResponseController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;
        APIResponseModel.findByIdAndRemove(id, function (err, APIResponse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the APIResponse.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
