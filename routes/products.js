const express = require('express');
const router = express.Router();
const Producto = require('../models/product');


router.get('/', (req, res) => {
    Producto
        .find({})
        .then(products => res.status(200).json(products))
        .catch(err => res.status(503).json(err))
})

router.get('/:productId', (req, res) => {
    let productId = req.params.productId;
    if (productId.length == 24 || productId.length == 12 ) {
        Producto
            .findById(productId)
            .then(product => {
                if (product) {                
                    res.status(200).json(product);
                } else {
                    res.status(404).json({message: 'no existe el producto'});
                }
            })
            .catch(err => res.status(503).json(err))
    } else {
        res.status(404).json({message: 'no existe el producto'})
    }
})

router.get('/buscar/:data', (req,res) => {
    let busqueda = req.params.data;
    Producto
        .find({nombre: {'$regex': new RegExp(busqueda), '$options': 'i'}})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(503).json(err))
})

router.post('/', (req, res) => {
    let data = new Producto(req.body);
    data.history = [];
    data.save()
        .then(product => res.status(201).json({product}))
        .catch(err => res.status(503).json(err))
})

router.put('/:productId', (req, res) => {
    let productId = req.params.productId;
    let data = req.body;
    if (productId.length == 24 || productId.length == 12 ) {
        Producto
            .updateOne({ _id:productId}, {$set: data})
            .then(product => res.status(201).json({product}))
            .catch(err => res.status(503).json(err))
    } else {
        res.status(404).json({message: 'no existe el producto'})
    }
})

router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    if (productId.length == 24 || productId.length == 12 ) {
        Producto
            .findById(productId)
            .then(product => {
                if (product) {
                    product
                        .remove()
                        .then(r => res.status(202).json({message: 'se borro el producto'}))
                        .catch(err => res.status(503).json(err))
                } else {
                    res.status(404).json({message: 'no existe el producto'});
                }
            })
            .catch(err => res.status(503).json(err))
    } else {
        res.status(404).json({message: 'no existe el producto'});
    }
})

module.exports = router;