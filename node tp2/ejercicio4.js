import { createServer } from 'node:http';
import { upperCase } from 'upper-case';

const server = createServer((req, res) => {
    const texto = upperCase("hola mundo con npm");

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>${texto}</h1>`);
});

server.listen(3001, '127.0.0.1', () => {
    console.log('Servidor en http://127.0.0.1:3001');
});