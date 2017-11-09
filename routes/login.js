const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

router.post('/', function(req, res) {
    let data = req.body;
    User
        .findOne({user: data.user})
        .then( function(user) {
            if (user && (user.password == data.password)) {
                let json = user.toJSON();
                delete json.password;
                let token = jwt.sign(json, 'mysecretolargo');
                res.status(200).json({token});
            } else {
                res.status(401).json({message: 'credenciales invalidas'})
            }
        })
})

module.exports = router;