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
                    <p>Trabajo práctico realizado con Node.js</p>
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
                    <p><strong>Hora:</strong> ${hora}</p>
                    <p><strong>Fecha:</strong> ${fecha}</p>
                    <p><strong>Clima:</strong> ☁️ Mayormente cubierto</p>
                    <p><strong>Temperatura:</strong> 21°C</p>
                </div>
            `;
            break;

        case '/calculo':
            contenido = `
                <div class="contenedor">
                    <h1>Cálculos</h1>
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
                    <h1>Información de la URL</h1>
                    <p><strong>Host:</strong> ${direccion.host}</p>
                    <p><strong>Path:</strong> ${direccion.pathname}</p>
                    <p><strong>Protocolo:</strong> ${direccion.protocol}</p>
                    <p><strong>URL completa:</strong> ${direccion.href}</p>
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
                    <h1>Información del proyecto</h1>
                    <p>Sitio desarrollado con Node.js</p>
                    <p>Puerto: 3001</p>
                </div>
            `;
            break;

        default:
            contenido = `
                <div class="contenedor">
                    <h1>Página no encontrada</h1>
                </div>
            `;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(menu() + contenido);
});

server.listen(3001, '127.0.0.1', () => {
    console.log('Servidor en http://127.0.0.1:3001');
});