const router = require('express').Router();
let Hault = require('../models/hault');
let Route = require('../models/route');

router.route('/add').post(async (req, res) => {
    const {
        name,
        sequence,
        routeId,
        location
    } = req.body;

    try {
        const routeOfHault = await Route.findById(routeId);
        if (!routeOfHault) {
            throw new Error('Invalid routeID');
        }
    } catch (err) {
        res.status(500).send(err.message || 'Internal Server Error!');
        return;
    }

    let locationObj = {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
    };

    try {
        const isExistWithSameSequence = await Hault.exists({
            routeId,
            sequence: sequence,
        });
        if (isExistWithSameSequence) {
            await Hault.updateMany({
                routeId,
                sequence: {
                    $gte: sequence
                },
            }, {
                $inc: { sequence: 1 }
            }, {
                sort: "sequence"
            })
        }
    } catch (err) {
        res.status(500).send(err.message || 'Internal Server Error!');
        return;
    }

    var newHault = new Hault({
        name,
        routeId,
        sequence,
        location: locationObj
    });
    newHault.save().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/').get((req, res) => {
    Hault.find().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/:id').get((req, res) => {
    var id = req.params.id;
    Hault.findById(id).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/getByRouteId/:routeId').get((req, res) => {
    var routeId = req.params.routeId;
    Hault.find({ routeId }).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
})

module.exports = router;