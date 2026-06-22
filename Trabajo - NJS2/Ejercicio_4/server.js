// Módulos nativos: servidor HTTP, lectura de archivos, rutas y parseo de URL
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
// Paquete externo instalado vía npm: convierte texto a mayúsculas
import { upperCase } from 'upper-case';

const server = http.createServer((req, res) => {
    // Parsea la URL para obtener pathname y query params
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    if (parsedUrl.pathname === '/') {
        // Sirve el HTML principal
        fs.readFile(path.join('public', 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });

    } else if (parsedUrl.pathname === '/style.css') {
        // Sirve el CSS
        fs.readFile(path.join('public', 'style.css'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });

    } else if (parsedUrl.pathname === '/convertir') {
        // Toma el texto pasado por query string (?texto=...) y lo devuelve en mayúsculas
        const textoOriginal = parsedUrl.searchParams.get('texto') || '';
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(upperCase(textoOriginal)); // usa el paquete npm 'upper-case'
    }
});

// Levanta el servidor en el puerto 3004
server.listen(3004, () => console.log('Proyecto 4 en http://localhost:3004'));