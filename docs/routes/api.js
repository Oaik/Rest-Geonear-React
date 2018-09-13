const express = require('express');

//setup app
const router = express.Router();
const Ninja = require("../models/ninja");
// get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
    /*Ninja.find({}).then((ninjas) => {
        res.send(ninjas);
    }) */
    Ninja.geoNear(
        {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then((ninjas) => {
        res.send(ninjas);
    });
});

// add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
    }).catch(next);
    
});

// update a ninija in db
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Ninja.findOne({_id: req.params.id}).then((ninja) => {
            res.send(ninja);
        })
    });
});

router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({
        _id: req.params.id
    }).then((ninja) => {
        res.send(ninja);
    });
});

module.exports = router;