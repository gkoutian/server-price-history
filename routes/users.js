const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.get('/', function(req, res) {
    let user = req.user;
    if (user.isAdmin) {
        User    
            .find({}, { password: 0})
            .then(users => res.status(200).json(users))
            .catch(err => res.status(503).json(err));
    } else {
        res.status(403).json({message: 'Acceso denegado'})
    }
})

router.get('/:userId', function(req, res) {
    let user = req.user;
    let userId = req.params.userId;
    if (userId.length == 24 || userId.length == 12 ) {
        if (user.isAdmin || userId == user._id) {
            User
                .findById(userId, {password: 0})
                .then(user => {
                    if (user) {
                        res.status(200).json(user);
                    } else {
                        res.status(404).json({message: 'Usuario no encontrado'});
                    }
                })
                .catch(err => res.status(503).json(err))
        } else {
            res.status(403).json({message: 'Acceso denegado'})
        }
    } else {
        res.status(404).json({message: 'Usuario no encontrado'});
    }
})

router.delete('/:userId', function(req, res) {
    let user = req.user;
    let userId = req.params.userId;
    if (userId.length == 24 || userId.length == 12 ) {
        if (user.isAdmin || userId == user._id) {
            User
                .findById(userId)
                .then(user => {
                    if (user) {
                        user.remove();
                        res.status(200).json(user);
                    } else {
                        res.status(404).json({message: "Usuario no encontrado"});
                    }
                })
                .catch(err => res.status(503).json(err))
        } else {
            res.status(403).json({message: 'Acceso denegado'})
        }
    } else {
        res.status(404).json({message: "Usuario no encontrado"});
    }
})

router.put('/:userId', function(req, res) {
    let user = req.user;
    let userId = req.params.userId;
    let data = req.body;
    if (userId.length == 24 || userId.length == 12 ) {
        if (user.isAdmin || userId == user._id) {
            User
                .findOneAndUpdate({ _id: userId }, data)
                .then( u => res.status(200).json(u))
                .catch(err => res.status(503).json(err))
        } else {
            res.status(403).json({message: 'Acceso denegado'})
        }
    } else {
        res.status(404).json({message: "Usuario no encontrado"});
    }
})

module.exports = router;