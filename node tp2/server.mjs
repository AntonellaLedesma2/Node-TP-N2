import { createServer } from 'node:http';
import { URL } from 'node:url';
import { upperCase } from 'upper-case';
import { menu } from './menu.js';

const server = createServer((req, res) => {
    const direccion = new URL(req.url, 'http://127.0.0.1:3001');

    let contenido = '';

    switch (direccion.pathname) {
        case '/':
            contenido = `
                <div class="contenedor">
                    <h1>Bienvenidos al sitio web</h1>
                    <p>Trabajo practico realizado con Node.js</p>
                </div>
            `;
            break;

        case '/tiempo':
    const ahora = new Date();

    const hora = ahora.toLocaleTimeString('es-AR');
    const fecha = ahora.toLocaleDateString('es-AR');

    contenido = `
        <div class="contenedor">
            <h1>Tiempo actual</h1>
            <p><b>Hora:</b> ${hora}</p>
            <p><b>Fecha:</b> ${fecha}</p>
            <p><b>Clima:</b> Despejado / parcialmente nublado</p>
            <p><b>Temperatura:</b> 21°C</p>
        </div>
    `;
    break;

        case '/calculo':
            contenido = `
                <div class="contenedor">
                    <h1>Calculos</h1>
                    <p>4 + 5 = ${4 + 5}</p>
                    <p>10 - 3 = ${10 - 3}</p>
                    <p>6 × 7 = ${6 * 7}</p>
                    <p>20 ÷ 4 = ${20 / 4}</p>
                </div>
            `;
            break;

        case '/url':
            contenido = `
                <div class="contenedor">
                    <h1>Informacion de la URL</h1>
                    <p><b>Host:</b> ${direccion.host}</p>
                    <p><b>Path:</b> ${direccion.pathname}</p>
                    <p><b>Protocolo:</b> ${direccion.protocol}</p>
                    <p><b>URL completa:</b> ${direccion.href}</p>
                </div>
            `;
            break;

        case '/uppercase':
            contenido = `
                <div class="contenedor">
                    <h1>Upper Case</h1>
                    <p>${upperCase('hola mundo desde node js')}</p>
                </div>
            `;
            break;

        case '/info':
            contenido = `
                <div class="contenedor">
                    <h1>Informacion del proyecto</h1>
                    <p>Sitio desarrollado con modulos de Node.js</p>
                    <p>Puerto: 3001</p>
                </div>
            `;
            break;

        default:
            contenido = `
                <div class="contenedor">
                    <h1>Pagina no encontrada</h1>
                </div>
            `;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(menu() + contenido);
});

server.listen(3001, '127.0.0.1', () => {
    console.log('Servidor en http://127.0.0.1:3001');
});