import http from 'node:http';
import {
    mostrarHora,
    mostrarFecha,
    mostrarClima,
    suma
} from './tiempo.js';

const servidor = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    res.end(
        "Hora actual: " + mostrarHora() +
        "\nFecha actual: " + mostrarFecha() +
        "\nClima: " + mostrarClima() +
        "\nSuma 5 + 3 = " + suma(5, 3)
    );
});

servidor.listen(3000, () => {
    console.log("Abrí en el navegador: http://localhost:3000");
});