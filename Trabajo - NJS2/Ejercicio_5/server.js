// Módulos nativos: servidor HTTP, lectura de archivos y rutas
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Paquete externo (npm) para convertir texto a mayúsculas
import { upperCase } from 'upper-case';

// Obtiene la ruta del archivo y carpeta actuales (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// "Base de datos" en memoria: contenido de cada sección de la SPA, como JSON
const baseDeDatosContenidos = {
    inicio: {
        tituloWeb: 'Inicio // LAB',
        idEnPantalla: 'INICIO',
        tituloContenido: upperCase('Index Matrix'), // texto pasado por upper-case
        descripcion: 'Entorno integrado web modular bajo el modelo SPA (Single Page Application). El HTML es estático y los datos viajan codificados en JSON puro.'
    },
    biografia: {
        tituloWeb: 'Biografía // LAB',
        idEnPantalla: 'BIOGRAFIA',
        tituloContenido: 'History Log',
        descripcion: 'Separación absoluta de responsabilidades lograda. Node.js procesa solicitudes de red mientras que el cliente se encarga del renderizado de la UI.'
    },
    servicios: {
        tituloWeb: 'Servicios // LAB',
        idEnPantalla: 'SERVICIOS',
        tituloContenido: 'Core Features',
        descripcion: 'Despliegue asíncrono controlado mediante peticiones fetch HTTP nativas, eliminando por completo las recargas de página lentas.'
    },
    portafolio: {
        tituloWeb: 'Portafolio // LAB',
        idEnPantalla: 'PORTAFOLIO',
        tituloContenido: 'Source Repositories',
        descripcion: 'Visualización de módulos lógicos desacoplados y empaquetados en un entorno de desarrollo profesional.'
    },
    contacto: {
        tituloWeb: 'Contacto // LAB',
        idEnPantalla: 'CONTACTO',
        tituloContenido: 'Terminal Endpoint',
        descripcion: 'Canal de transmisión abierto en el socket local: root@integrated.lab // Puerto de escucha activo: 3005.'
    }
};

const server = http.createServer((req, res) => {
    // Parsea la URL entrante para obtener pathname y query params
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    // 1. Enrutador de Archivos Estáticos (HTML, CSS, JS del cliente)
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
        // Sirve el HTML principal de la SPA
        fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    if (parsedUrl.pathname === '/global.css') {
        // Sirve los estilos globales
        fs.readFile(path.resolve(__dirname, 'public', 'global.css'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
        return;
    }

    if (parsedUrl.pathname === '/app.js') {
        // Sirve el JavaScript que corre en el navegador (lógica de la SPA)
        fs.readFile(path.resolve(__dirname, 'public', 'app.js'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    // 2. Endpoint de la API REST (Devuelve datos puros en JSON)
    if (parsedUrl.pathname === '/api/contenido') {
        // Recibe la sección pedida por query string (?page=...), por defecto 'inicio'
        const paginaSolicitada = parsedUrl.searchParams.get('page') || 'inicio';
        const datos = baseDeDatosContenidos[paginaSolicitada];

        if (datos) {
            // Si la sección existe, devuelve su contenido como JSON
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(datos));
        } else {
            // Si no existe esa sección, devuelve 404 con un error en JSON
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "PAGE_NOT_FOUND" }));
        }
        return;
    }

    // 404 para cualquier otra ruta no reconocida
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404_NOT_FOUND');
});

// Evita que un error inesperado tumbe el proceso del servidor; solo lo loguea
process.on('uncaughtException', (err) => console.error('💥 Error evitado:', err.message));

// Levanta el servidor en el puerto 3005
server.listen(3005, () => console.log('Proyecto 5 (Profesional) en http://localhost:3005'));