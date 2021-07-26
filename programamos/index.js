//BACKEND

const express = require('express');
const app = express();

//escuchando al servidor
app.listen(3000, () => {
    console.log('Servidor iniciado...');
});

let contactos = [
    {
        id: 1,
        nombre: "Pepe",
        email: "pepe@gmail.com"
    },
    {
        id: 2,
        nombre: "Hugo",
        email: "hugo@gmail.com"
    },
    {
        id: 3,
        nombre: "Juan",
        email: "juan@gmail.com"
    },
    {
        id: 4,
        nombre: "Juan",
        email: "juan@gmail.com"
    }
];

app.get('/contactos/:id_contacto', function (req,res){
    let contacto = contactos.find(element => element.id == req.params.id_contacto);
    return res.json(contacto);
});

app.get('/contactos', function (req,res){
    let contacto = contactos.find(element => element.nombre == req.query.nombre);
    return res.json(contacto);
});

app.get('/contactos', function (req,res){
    let contacto = contactos.filter(element => element.nombre == req.query.nombre);
    console.log(contacto);
    if(contacto.length<1){
        res.status(404).json('Usuario no encontrado');
    }
    return res.json(contacto);
});

app.get('/contactos/:id_contacto', validarId, function (req,res){
    let contacto = contactos.find(element => element.id == req.params.id_contacto);
    if (!contacto){
        res.status(404).json('Usuario no encontrado');
    }
    return res.json(contacto);
});

function validarId(req, res, next){
    let id = parseInt (req.params.id_contacto); //devulve NAN
    console.log(id);
    // if(!isNaN(id)){
    if(!isNaN(id)){
        next();
    }
    else{
        return res.status(400).json('Id debe ser un numero');
    }
}