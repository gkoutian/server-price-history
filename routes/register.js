const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.post('/', function(req, res)  {
    let data = req.body;
    data.isAdmin = false;
    let newUser = new User(data);
    newUser
        .save()
        .then(u => res.status(201).json(u))
        .catch(err => res.status(503).json(err))
})

module.exports = router;