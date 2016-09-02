var BaseModel = require('../models/BaseModel.js');

/**
 * BaseController.js
 *
 * @description :: Server-side logic for managing Bases.
 */
module.exports = {

    /**
     * BaseController.list()
     */
    list: function (req, res) {
        BaseModel.find(function (err, Bases) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Base.',
                    error: err
                });
            }
            return res.json(Bases);
        });
    },

    /**
     * BaseController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        BaseModel.findOne({_id: id}, function (err, Base) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Base.',
                    error: err
                });
            }
            if (!Base) {
                return res.status(404).json({
                    message: 'No such Base'
                });
            }
            return res.json(Base);
        });
    },

    /**
     * BaseController.create()
     */
    create: function (req, res) {
        var Base = new BaseModel({			base_name : req.body.base_name,			lat : req.body.lat,			lng : req.body.lng
        });

        Base.save(function (err, Base) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Base',
                    error: err
                });
            }
            return res.status(201).json(Base);
        });
    },

    /**
     * BaseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        BaseModel.findOne({_id: id}, function (err, Base) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Base',
                    error: err
                });
            }
            if (!Base) {
                return res.status(404).json({
                    message: 'No such Base'
                });
            }

            Base.base_name = req.body.base_name ? req.body.base_name : Base.base_name;			Base.lat = req.body.lat ? req.body.lat : Base.lat;			Base.lng = req.body.lng ? req.body.lng : Base.lng;			
            Base.save(function (err, Base) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Base.',
                        error: err
                    });
                }

                return res.json(Base);
            });
        });
    },

    /**
     * BaseController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        BaseModel.findByIdAndRemove(id, function (err, Base) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Base.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
