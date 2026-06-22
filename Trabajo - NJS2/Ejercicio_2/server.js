// Módulos nativos: crear servidor HTTP, leer archivos del disco y manejar rutas
import http from 'http';
import fs from 'fs';
import path from 'path';

// Servidor que responde según la URL pedida
const server = http.createServer((req, res) => {

    if (req.url === '/') {
        // Lee y devuelve el HTML principal desde la carpeta public
        fs.readFile(path.join('public', 'sitio.html'), (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        });

    } else if (req.url === '/style.css') {
        // Lee y devuelve el CSS desde la carpeta public
        fs.readFile(path.join('public', 'style.css'), (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        });

    } else {
        // Cualquier otra ruta devuelve 404
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 IO_ERROR');
    }
});

// Levanta el servidor en el puerto 3002
server.listen(3002, () => console.log('Proyecto 2 en http://localhost:3002'));