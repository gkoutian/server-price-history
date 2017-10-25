const express = require('express');
const router = express.Router();
const Producto = require('../models/product');
const chalk = require('chalk');

router.get('/', (req, res) => {
    Producto.find({})
        .then(products => {
            console.log(chalk.inverse('GET') + ' - Productos - ' + chalk.green.bold('200'));
            res.status(200).json(products)
        })
        .catch(err => {
            console.log(chalk.inverse('GET') + ' - Productos - ' + chalk.red.bold('503'));
            res.status(503).json(err)
        })
})

router.get('/:productId', (req, res) => {
    let productId = req.params.productId;
    Producto.findById(productId)
        .then(product => {
            if (product) {
                console.log(chalk.inverse('GET') + ` - Producto id: ${productId} - ` + chalk.green.bold('202'));
                res.status(200).json(product);
            } else {
                console.log(chalk.inverse('GET') + ` - Producto id: ${productId} - ` + chalk.yellow.bold('404'));
                res.status(404).json({message: 'no existe el producto'});
            }
        })
        .catch(err => {
            console.log(chalk.inverse('GET') + ` - Producto id: ${productId} - ` + chalk.red.bold('503'));
            res.status(503).json(err);
        })
})

router.get('/buscar/:data', (req,res) => {
    let busqueda = req.params.data;
    Producto.find({nombre: {'$regex': new RegExp(busqueda), '$options': 'i'}})
        .then(result => {
            console.log(chalk.inverse('GET') + ` - Busqueda: ${busqueda} - ` + chalk.green.bold('200'));
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(chalk.inverse('GET') + ` - Busqueda: ${busqueda} - ` + chalk.red.bold('503'));
            res.status(503).json(err);
        })
})

router.post('/', (req, res) => {
    let data = new Producto(req.body);
    data.history = [];
    data.save()
        .then(product => {
            console.log(chalk.inverse('POST') + ' - Productos - ' + chalk.green.bold('201'));
            console.log(req.body);
            res.status(201).json({product});
        })
        .catch( err => {
            console.log(chalk.inverse('POST') + ' - Productos - ' + chalk.red.bold('503'));
            res.status(503).json(err);
        })
})

router.put('/:productId', (req, res) => {
    let productId = req.params.productId;
    let data = req.body;
    Producto.updateOne({ _id:productId}, {$set: data})
        .then(product => {
            console.log(chalk.inverse('PUT') + ' - Productos - ' + chalk.green.bold('200'));
            console.log(data);
            res.status(201).json({product});
        })
        .catch(err => {
            console.log(chalk.inverse('PUT') + ` - Producto id: ${productId} - ` + chalk.red.bold('503'));
            res.status(503).json(err);
        })
})

router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Producto.findById(productId)
        .then(product => {
            if (product) {
                product.remove()
                    .then(r => {
                        console.log(chalk.inverse('DELETE') + ` - Producto id: ${productId} - ` + chalk.green.bold('202'));
                        res.status(202).json({message: 'se borro el producto'});
                    })
                    .catch(err => {
                        console.log(chalk.inverse('DELETE') + ` - Producto id: ${productId} - ` + chalk.red.bold('503'));
                        res.status(503).json(err);
                    })
            } else {
                console.log(chalk.inverse('DELETE') + ` - Producto id: ${productId} - ` + chalk.yellow.bold('404'));
                res.status(404).json({message: 'no existe el producto'});
            }
        })
        .catch(err => {
            console.log(chalk.inverse('DELETE') + ` - Producto id: ${productId} - ` + chalk.red.bold('503'));
            res.status(503).json(err);
        })
})

module.exports = router;