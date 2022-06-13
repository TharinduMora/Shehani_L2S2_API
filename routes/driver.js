const router = require('express').Router();
let Driver = require('../models/driver');

router.route('/add').post((req, res) => {
    const {name,
        id,
        licenseNo,
        address,
        qualifications,
        rating,
        noOfRaters,
        contactNumbers } = req.body;
    var newDriver = new Driver({
        name,
        id,
        licenseNo,
        address,
        qualifications,
        rating,
        noOfRaters,
        contactNumbers
    });
    newDriver.save().then(() => {
        res.json("Driver Added.");
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/').get((req, res) => {
    Driver.find().then((driver) => {
        res.json(driver);
    }).catch((err) => {
        res.send(err);
    })
})

router.route('/update/:id').put((req, res) => {
    const driverId = req.params.id;
    const { name,
        id,
        licenseNo,
        address,
        qualifications,
        rating,
        noOfRaters,
        contactNumbers } = req.body;
    var updateDriver = {
        name,
        id,
        licenseNo,
        address,
        qualifications,
        rating,
        noOfRaters,
        contactNumbers
    };
    var update = Driver.findByIdAndUpdate(driverId, updateDriver).then((update) => {
        res.json(update);
    }).catch((err) => {
        res.send(err);
    });
})


router.route('/delete/:id').delete((req, res) => {
    var driverId = req.params.id;
    var deleteDriver = Doctor.findByIdAndDelete(driverId).then((deleteDriver) => {
        res.json(deleteDriver);
    }).catch((err) => {
        res.send(err);
    });
})
//find the nearest and most suitable driver at the provincial and district level.

router.route('/getDriversByLocation/:location').get(async (req, res) => {

    const location = req.params.location;

    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    
    const searchRgx = rgx(location);

    try {
        const driver = await Driver.find().or([
            { "address.province": { $regex: searchRgx, $options: "i" } },
            { "address.district": { $regex: searchRgx, $options: "i" } }
        ]);
        res.send(drivers);
    } catch (err) {
        res.status(500).send(err.message || 'Internal Server Error!')
    }
})

router.route('/:id').get(async (req, res) => {
    var driverId = req.params.id;
    var driver = await Driver.findById(driverId).then((driver) => {
        res.json(driver);
    }).catch((err) => {
        res.send(err);
    });
})

module.exports = router;