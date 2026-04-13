import { createServer } from 'node:http';
import { URL } from 'node:url';

const server = createServer((req, res) => {
    const direccion = new URL(req.url, 'http://127.0.0.1:3001');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(`
        <h1>Informacion de la URL</h1>
        <p><strong>Host:</strong> ${direccion.host}</p>
        <p><strong>Path:</strong> ${direccion.pathname}</p>
        <p><strong>Protocolo:</strong> ${direccion.protocol}</p>
        <p><strong>Parametros:</strong> ${direccion.search}</p>
        <p><strong>URL completa:</strong> ${direccion.href}</p>
    `);
});

server.listen(3001, '127.0.0.1', () => {
    console.log('Servidor ejecutándose en http://127.0.0.1:3001');
});