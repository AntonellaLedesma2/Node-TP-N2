// Rutas y configuración de navegación en el cliente (Estructura pura de datos)
const paginas = [
    { id: 'inicio', label: '01_INICIO' },
    { id: 'biografia', label: '02_BIOGRAFIA' },
    { id: 'servicios', label: '03_SERVICIOS' },
    { id: 'portafolio', label: '04_PORTAFOLIO' },
    { id: 'contacto', label: '05_CONTACTO' }
];

// Generar dinámicamente los botones en el DOM de forma limpia
const menuContenedor = document.getElementById('menu-contenedor');
paginas.forEach(pag => {
    const btn = document.createElement('button');
    btn.innerText = pag.label;
    btn.id = `btn-${pag.id}`;
    btn.onclick = () => cargarPagina(pag.id); // al hacer clic, carga esa sección sin recargar la página
    menuContenedor.appendChild(btn);
});

// Función asíncrona para pedirle los datos a la API de Node.js sin recargar la página (Estilo Dashboard real)
async function cargarPagina(idPagina) {
    try {
        // Pide al backend el contenido de la sección (server.js responde según ?page=...)
        const res = await fetch(`/api/contenido?page=${idPagina}`);
        if (!res.ok) throw new Error('Error al obtener los datos de la API');
        const data = await res.json();

        // Actualizar el DOM con los datos recibidos
        document.getElementById('page-buffer').innerText = `// SYSTEM_PAGE_VIEW_BUFFER -> ${data.idEnPantalla}`;
        document.getElementById('page-title').innerText = data.tituloContenido;
        document.getElementById('page-description').innerText = data.descripcion;
        document.title = data.tituloWeb; // cambia el título de la pestaña del navegador

        // Cambiar la clase activa visual en el menú: quita "active" de todos los botones...
        paginas.forEach(pag => {
            document.getElementById(`btn-${pag.id}`).classList.remove('active');
        });
        // ...y la pone solo en el botón de la sección recién cargada
        document.getElementById(`btn-${idPagina}`).classList.add('active');

    } catch (error) {
        // Si falla la petición, muestra un mensaje de error en pantalla en vez de romper la app
        document.getElementById('page-title').innerText = "ERR_CONNECTION_LOST";
        document.getElementById('page-description').innerText = "No se pudo sincronizar con la API interna de Node.js.";
    }
}

// Control del tema visual (Modo Oscuro / Claro)
function toggleTheme() {
    const body = document.body;
    const target = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', target);
    localStorage.setItem('theme', target); // guarda la preferencia para futuras visitas
}

// Carga inicial (Arranca en 'inicio')
if (localStorage.getItem('theme') === 'dark') document.body.setAttribute('data-theme', 'dark'); // respeta el tema guardado
cargarPagina('inicio'); // carga la sección de inicio al abrir la página