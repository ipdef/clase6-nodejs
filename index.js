const express = require('express');
const server = express();

let contactos = [

];
    //use-metodo
server.use(express.json()); //middleware que permite obtener el json que viene en el body de un request

//Middleware Global
function log(req, res, next) {
    const { method, path, query,body } = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
}

//Implementacion del Middleware Global
server.use(log);

//Middleware Particular
function validarContacto(req, res, next) {
    const { nombre, apellido, email } = req.body;
    if (!nombre || !apellido || !email) {
        return res.status(400).json('Datos del contacto invalido!!!');
    }
    return next();
}

//Middleware Particular
function validarSiExiste(req, res, next) {
    const {email} = req.body;
    const i = contactos.findIndex(c => {
        return c.email == email;
    });
    if (i >= 0){
        return res.status(409)
            .json('El contacto ya existe!!!');
    }
    return next();
}

//Middleware Particular
function validarVersion(req, res, next) {
    const { version } = req.query;
    const versionNumeric = Number(version);

    if (!version || !versionNumeric || versionNumeric < 5){
        return res.status(422)
            .json('Versión invalida!!!');
    }
    return next();
}

server.get('/contacto',(req, res) => {
    res.json(contactos);
});

//Ruta que implementa dos middleware particulares
server.post('/contacto', validarContacto, validarSiExiste, (req, res) => {
    contactos.push(req.body);
    res.json("Contacto agregado");
});

//query
//Ruta que implementa dos middleware particulares
server.get('/demo', validarVersion, (req, res) => {
    res.json("Hola mundo!!!");
});

server.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    console.log(JSON.stringify(err));

    return res.status(500)
        .json("Se han producido un error inesperado.");
});

//escuchando al servidor
server.listen(3000, () => {
    console.log('Servidor iniciado...');
});