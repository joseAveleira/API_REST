var express = require('express');
var cors = require('cors');
//añadimos mongoose
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//añadimos el modelo
var Device = require('./models/device');
const mongoSanitize = require('express-mongo-sanitize');
var app = express();
var port = 3000;
var database = 'mongodb://localhost:27017/demoAPIREST';
mongoose.connect(database);
var db= mongoose.connection;
var middleware = require('./auth/middleware');
var broker= require('./services/broker');


var authCtrl = require('./auth/auth');



db.on('error', console.error.bind(console, 'Error de conexion:'));
db.once('open', function() {
    console.log('Conectado a la base de datos');
});

app.use(bodyParser.urlencoded({ extended: true }));
// configuramos par obtener datos en formato json
app.use(bodyParser.json());
//permite el acceso a la API desde cualquier origen

app.get('/devices', function (req, res) {
    
    res.json({
        msg:'el API REST funciona!'
    });
});

app.use(mongoSanitize());

//peticion POST para crear un nuevo dispositivo
app.post('/devices', async function (req, res) {
    try {
        // Creamos un nuevo dispositivo con los datos del request
        //mostramos por consola req body
        console.log(req.body);
        var device = new Device(req.body);
        // Guardamos el dispositivo en la base de datos usando await para esperar la promesa
        await device.save();
        console.log("entro en guardar");
        //console.log(device);
        res.status(200).json({
            msg: 'Dispositivo guardado correctamente',
            device: device
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al guardar el dispositivo',
            error: err
        });
    }
});

//peticion GET para obtener los datos de un dispositivo por su tipo
app.get('/devices/:type',middleware.ensureAuthenticated, async (req, res) => {
    try {
        console.log(JSON.stringify(req.params, null, 2));
        // Realiza la búsqueda con un filtro, por ejemplo, {"type": "temperature"}
        const devices = await Device.find(req.params).exec();
        res.json(devices);
    } catch (err) {
        res.status(500).json({
            errorGenerado: 'Error al buscar dispositivos',
            error: err
        });
    }
});

//Peticion PUT para atualizar los datos de un dispositivo

app.put('/devices/:type', async (req, res) => {
    try {
        const device = await Device.findOneAndUpdate(req.params, req.body).exec();
        if (device === null) {
            return res.status(404).json({
                msg: 'No se ha encontrado el dispositivo'
            });
        }else{
        res.json({
            msg: 'Dispositivo actualizado correctamente',
            device: device
        });
    }
    } catch (err) {
        res.status(500).json({
            msg: 'Error al actualizar el dispositivo',
            error: err
        });
    }
});


//Peticion DELETE para borrar un dispositivo
app.delete('/devices/:type', async (req, res) => {
    try {
        console.log(JSON.stringify(req.params, null, 2));
        // Busca el dispositivo por type  y lo borra
        const device = await Device.findOneAndDelete(req.params).exec();
        res.json({
            msg: 'Dispositivo borrado correctamente',
            device: device
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al borrar el dispositivo',
            error: err
        });
    }
});

//peticion POST para Listar un dispositivo por su tipo



app.post('/devices/find', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body, null, 2));
        
        // Realiza la búsqueda con un filtro, por ejemplo, {"type": "temperature"}
        
        const devices = await Device.find(req.body).exec();
        res.json(devices);
    } catch (err) {
        res.status(500).json({
            msg: 'Error al buscar dispositivos',
            error: err
        });
    }
});

app.post('/auth/login', authCtrl.aliasLogin);


broker.startBroker();
// app.listen para arrancar el servidor web con express en el puerto 3000
app.listen(port, function () {
    console.log('API REST en el puerto ' + port);
});
