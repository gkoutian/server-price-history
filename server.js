const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})


mongoose.connect(`mongodb://user:pass@ds231205.mlab.com:31205/price-history`, (err, res) => {
    if (err) {
        console.log(chalk.red.bold("No se pudo conectar a la base de datos"))
    } else {
        console.log(chalk.green.bold("Conexion a la base de datos realizada"))
        app.listen(app.get('port'));
        console.log(chalk.blue.bold('Servidor express iniciado en el puerto ', app.get('port')));
    }
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('port', (process.env.PORT || 4000));


const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const productRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const errorhandler = require('./routes/middlewares/errorhandler');
const authValidator = require('./routes/middlewares/authvalidator');
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', authValidator, errorhandler, productRouter);
app.use('/users', authValidator, errorhandler, usersRouter);
app.post('/upload', upload.single('file'), (req, res) => {
    let data = req
    res.status(201).json({filename: 'https://server-price-history.herokuapp.com/uploads/' + data.file.filename});
})
app.get('/uploads/:imageId', (req, res) => {
    let imageId = req.params.imageId;
    res.sendFile('uploads/' + imageId)
})
