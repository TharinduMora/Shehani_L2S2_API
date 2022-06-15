const router = require('express').Router();
let TripController = require('../controller/trip.controller');

router.route('/get-all').get(TripController.getAll);

router.route('/add').post(TripController.add);

router.route('/:id/update').put(TripController.update);

router.route('/:id/hault/get-all').get(TripController.getAllHaults);

router.route('/:id/hault/add').post(TripController.addHaults);

router.route('/:id/hault/:haltId/update').put(TripController.updateHault);

module.exports = router;