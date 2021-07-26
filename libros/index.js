const express = require('express');
const server = express();

server.use(express.json());

server.listen(3000, () => {
    console.log('Servidor iniciando...');
});

let autoresLibros = [
    {
        id: 1,
        nombre: "Pepito",
        apellido: "perez",
        fechaNacimiento: "24/08/1998",
        Libros: [
            {
                id: 1,
                titulo: "El diario de vampiros",
                descripcion: "Trata sobre la tarma y dramatica de un vampiro",
                añoPublicacion: 1950,
            },
            {
                id: 2,
                titulo: "Los avengers",
                descripcion: "Trata sobre la tarma y dramatica de un vampiro",
                añoPublicacion: 1960,
            },
        ]
    },
    {
        id: 2,
        nombre: "Mario",
        apellido: "Vargas Llosa",
        fechaNacimiento: "24/08/1960",
        Libros: [
            {
                id: 1,
                titulo: "La ciudad y los perros",
                descripcion: "Trata sobre la tarma y dramatica de un vampiro",
                añoPublicacion: 1950,
            },
            {
                id: 2,
                titulo: "Los avengers",
                descripcion: "Trata sobre la tarma y dramatica de un vampiro",
                añoPublicacion: 1960,
            },
        ]
    }
]

// let autores = [];
// server.get('/autores', function (req, res){
//     autoresLibros.forEach(element => {
//         autores.push(element.nombre + " " + element.apellidos);
//     });
//     res.send(autores);
//     autores = []; //se cierra elforeach
// });

server.get('/autores', function (req, res){
    res.send(autoresLibros);
});

server.post('/autores', function (req, res){
    autoresLibros.push({nombre: req.body.nombre, apellido:req.body.apellido, fechaNacimiento: req.body.fechaNacimiento});
    res.send("Autor Agregado");
});