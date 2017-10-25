const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const cors = require('cors');

const app = express();
const user = "user";
const pass = "pass";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(`mongodb://${user}:${pass}@ds231205.mlab.com:31205/price-history`, (err, res) => {
    if (err) {
        console.log(chalk.red.bold("No se pudo conectar a la base de datos"))
    } else {
        console.log(chalk.green.bold("Conexion a la base de datos realizada"))
        app.listen(4000);
        console.log(chalk.blue.bold(`Servidor express iniciado en el puerto 4000`));
    }
})

const productRouter = require('./routes/products');
app.use('/productos', productRouter);
