const router = require('express').Router();
const User = require('../models/user');

router.route('/add').post((req,res)=>{
    const {id,name,address,contactNumbers,locations} = req.body;

    var newUser = new User({
        id,
        name,
        address,
        contactNumbers,
        locations
    });

    newUser.save().then(()=>{
        res.json("User Added.");
    }).catch(()=>{
        res.send(err);
    });
})

router.route('/').get((req,res)=>{
    User.find().then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.send(err);
    });
})

router.route('/update/:id').put((req,res)=>{
    var userId = req.params.id;
    const {id,name,address,contactNumbers,locations} = req.body;
    var updateUser = {
        id,
        name,
        address,
        contactNumbers,
        locations
    };
    var update = User.findByIdAndUpdate(patientId,updateUser).then((update)=>{
        res.json(update);
    }).catch((err)=>{
        res.send(err);
    });
})

router.route('/delete/:id').delete((req,res)=>{
    var userId = req.params.id;
    User.findByIdAndDelete(userId).then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.send(err);
    });
})

router.route('/:id').get((req,res)=>{
    var userId = req.params.id;
    User.findById(userId).then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.send(err);
    });
})

module.exports = router;