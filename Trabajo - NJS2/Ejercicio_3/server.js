// Módulos nativos: servidor HTTP, lectura de archivos, rutas de archivos y parseo de URL
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const server = http.createServer((req, res) => {
    // Convierte la URL recibida en un objeto URL para poder leer pathname y query params
    const miURL = new URL(req.url, `http://${req.headers.host}`);

    if (miURL.pathname === '/') {
        // Sirve el HTML principal
        fs.readFile(path.join('public', 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });

    } else if (miURL.pathname === '/style.css') {
        // Sirve el CSS
        fs.readFile(path.join('public', 'style.css'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });

    } else if (miURL.pathname === '/api/parse') {
        // Endpoint que recibe una URL por query string (?url=...) y la descompone en partes
        const urlParaAnalizar = miURL.searchParams.get('url');
        try {
            const parsed = new URL(urlParaAnalizar);

            // Objeto con las partes de la URL analizada
            const infoUrl = {
                host: parsed.host,
                path: parsed.pathname,
                protocolo: parsed.protocol,
                puerto: parsed.port,
                parametros: parsed.search
            };

            console.log("\n[URL_MODULE_LOG]", infoUrl); // log en consola del servidor

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(infoUrl));

        } catch {
            // Si la URL recibida no es válida, responde error 400
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "ERR_INVALID_URL" }));
        }
    }
});

// Levanta el servidor en el puerto 3003
server.listen(3003, () => console.log('Proyecto 3 en http://localhost:3003'));