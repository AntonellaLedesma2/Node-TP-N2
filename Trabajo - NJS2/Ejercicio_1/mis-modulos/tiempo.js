export function obtenerFechaHora() {
    return new Date().toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'medium' });
}

export function obtenerClima() {
    return { temperatura: '24°C', estado: 'CYBER_SKY_CLEAR' };
}