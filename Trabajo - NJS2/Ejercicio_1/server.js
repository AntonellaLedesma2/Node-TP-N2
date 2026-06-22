// Módulos nativos de Node para crear el servidor, leer archivos y manejar rutas
import http from 'http';
import fs from 'fs';
import path from 'path';

// Funciones propias importadas
import { obtenerFechaHora, obtenerClima } from './mis-modulos/tiempo.js';
import { sumar } from './mis-modulos/calculo.js';

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        fs.readFile(path.join('public', 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });

    } else if (req.url === '/style.css') {
        fs.readFile(path.join('public', 'style.css'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });

    } else if (req.url === '/api/datos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            fecha: obtenerFechaHora(),   
            clima: obtenerClima(),       
            resultado: sumar(15, 10)     
        }));
    }
});

// Levanta el servidor
server.listen(3001, () => console.log('Proyecto 1 en http://localhost:3001'));