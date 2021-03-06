const router = require('express').Router();
let Trip = require('../models/trip');
let TripHault = require('../models/trip-hault');

router.route('/get-all').get(async (req, res) => {
    Trip.find().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
});

router.route('/add').post(async (req, res) => {
    const {
        name,
        startTime,
        repeat
    } = req.body;
    var startTimeInMins = getMinsByTime(startTime);
    if (!(repeat === 'Daily' || repeat === 'Weekdays' || repeat === 'Weekend')) {
        res.status(400).json('Invlid repeat value');
        return;
    }
    var newTrip = new Trip({
        name,
        startTime: startTimeInMins,
        repeat
    })
    newTrip.save().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
});

router.route('/:id/update').put(async (req, res) => {
    const tripId = req.params.id;
    const {
        name,
        startTime,
        repeat
    } = req.body;
    var startTimeInMins = getMinsByTime(startTime);
    if (!(repeat === 'Daily' || repeat === 'Weekdays' || repeat === 'Weekend')) {
        res.status(400).json('Invalid repeat value');
        return;
    }
    var updateTrip = {
        name,
        startTime: startTimeInMins,
        repeat
    }
    Trip.findByIdAndUpdate(tripId, updateTrip).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
});

router.route('/:id/hault/get-all').get(async (req, res) => {
    const tripId = req.params.id;
    TripHault.find({tripId}).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
});

router.route('/:id/hault/add').post(async (req, res) => {
    const tripId = req.params.id;
    const {
        name,
        location,
        timeSinceTripStart
    } = req.body;

    try {
        const tripExists = await Trip.exists({ _id: tripId });
        if (!tripExists) {
            throw new Error('Invalid Trip-ID');
        }
    } catch (err) {
        res.status(500).send(err.message || 'Internal Server Error!');
        return;
    }

    let locationObj = {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
    };

    var newTripHault = new TripHault({
        name,
        tripId,
        timeSinceTripStart,
        location: locationObj
    });
    newTripHault.save().then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
});

router.route('/:id/hault/:haltId/update').put(async (req, res) => {

    const tripId = req.params.id;
    const haltId = req.params.haltId;
    const {
        name,
        location,
        timeSinceTripStart
    } = req.body;

    try {
        const tripExists = await Trip.exists({ _id: tripId });
        if (!tripExists) {
            throw new Error('Invalid Trip-ID');
        }
    } catch (err) {
        res.status(500).send(err.message || 'Internal Server Error!');
        return;
    }

    let locationObj = {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
    };

    var updateTripHault = {
        name,
        location: locationObj,
        timeSinceTripStart
    }
    TripHault.findByIdAndUpdate(haltId, updateTripHault).then((response) => {
        res.json(response);
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;

function getMinsByTime(t) {
    try {
        // 13:10  -> 1:10p
        const myArray = t.substring(1).split(":");
        let h = parseInt(myArray[0]);
        let m = parseInt(myArray[1]);
        let mT = h * 60 + m;
        return mT
    } catch (err) {
        return 0;
    }
}