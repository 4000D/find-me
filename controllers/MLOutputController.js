const MLOutputModel = require('../models/MLOutputModel.js');

/**
 * MLOutputController.js
 *
 * @description :: Server-side logic for managing MLOutputs.
 */
module.exports = {

    /**
     * MLOutputController.list()
     */
    list: function (req, res) {
        MLOutputModel.find(function (err, MLOutputs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting MLOutput.',
                    error: err
                });
            }
            return res.json(MLOutputs);
        });
    },

    /**
     * MLOutputController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        MLOutputModel.findOne({_id: id}, function (err, MLOutput) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting MLOutput.',
                    error: err
                });
            }
            if (!MLOutput) {
                return res.status(404).json({
                    message: 'No such MLOutput'
                });
            }
            return res.json(MLOutput);
        });
    },

    /**
     * MLOutputController.create()
     */
    create: function (req, res) {
        let MLOutput = new MLOutputModel({			csv_file_name : req.body.csv_file_name,			image_file_name : req.body.image_file_name,			predicted_sign_names : req.body.predicted_sign_names
        });

        MLOutput.save(function (err, MLOutput) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating MLOutput',
                    error: err
                });
            }
            return res.status(201).json(MLOutput);
        });
    },

    /**
     * MLOutputController.update()
     */
    update: function (req, res) {
        let id = req.params.id;
        MLOutputModel.findOne({_id: id}, function (err, MLOutput) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting MLOutput',
                    error: err
                });
            }
            if (!MLOutput) {
                return res.status(404).json({
                    message: 'No such MLOutput'
                });
            }

            MLOutput.csv_file_name = req.body.csv_file_name ? req.body.csv_file_name : MLOutput.csv_file_name;			MLOutput.image_file_name = req.body.image_file_name ? req.body.image_file_name : MLOutput.image_file_name;			MLOutput.predicted_sign_names = req.body.predicted_sign_names ? req.body.predicted_sign_names : MLOutput.predicted_sign_names;
            MLOutput.save(function (err, MLOutput) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating MLOutput.',
                        error: err
                    });
                }

                return res.json(MLOutput);
            });
        });
    },

    /**
     * MLOutputController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;
        MLOutputModel.findByIdAndRemove(id, function (err, MLOutput) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the MLOutput.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
