const router = require('express').Router();
let Route = require('../models/route');

router.route('/add').post((req, res) => {
    const {
        name,
        routeNumber
    } = req.body;
    var newRoute = new Route({
        name,
        routeNumber
    });
    newRoute.save().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/').get((req, res) => {
    Route.find().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/:id').get((req, res) => {
    var id = req.params.id;
    Route.findById(id).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

module.exports = router;