/* ⚡ Script para depuración extrema: Registra CADA evento del ciclo de vida de la página */

// 1. Monitorear eventos del Document y Window
const eventosGlobales = [
    'DOMContentLoaded', 'readystatechange', 'load',
    'beforeunload', 'unload', 'pageshow', 'pagehide',
    'resize', 'scroll', 'error', 'abort', 'focus', 'blur'
];

eventosGlobales.forEach(evento => {
    window.addEventListener(evento, e => {
        console.log(`[WINDOW] ${e.type.toUpperCase()}`, {
            tipo: e.type,
            objetivo: e.target?.tagName || 'window',
            timestamp: performance.now().toFixed(2) + 'ms'
        });
    }); 
});

// 2. Interceptar creación de elementos PARA MONITOREAR SUS EVENTOS
const originalCreateElement = document.createElement.bind(document);
document.createElement = function (tagName, options) {
    const element = originalCreateElement(tagName, options);

    // Monitorear eventos de recursos críticos
    const eventosRecursos = ['load', 'error', 'abort', 'stalled'];
    if (['IMG', 'SCRIPT', 'LINK', 'IFRAME'].includes(element.tagName)) {
        eventosRecursos.forEach(evento => {
            element.addEventListener(evento, function (e) {
                console.log(`[RECURSO] ${element.tagName} ${evento.toUpperCase()}:`, {
                    src: element.src || element.href,
                    readyState: element.readyState,
                    completo: element.complete
                });
            });
        });
    }

    return element;
};

// 3. Hookear XMLHttpRequest y Fetch para ver todas las solicitudes
// Interceptar XMLHttpRequest
const originalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function () {
    const xhr = new originalXHR();
    const eventosXHR = ['loadstart', 'progress', 'load', 'loadend', 'error', 'abort'];

    eventosXHR.forEach(evento => {
        xhr.addEventListener(evento, function (e) {
            console.log(`[XHR] ${evento.toUpperCase()}:`, {
                url: xhr.responseURL,
                status: xhr.status,
                metodo: xhr._method || 'GET'
            });
        });
    });

    return xhr;
};

// Interceptar Fetch
const originalFetch = window.fetch;
window.fetch = function (...args) {
    const inicio = performance.now();
    return originalFetch(...args).then(resp => {
        console.log(`[FETCH] COMPLETADO:`, {
            url: args[0],
            status: resp.status,
            duracion: (performance.now() - inicio).toFixed(2) + 'ms'
        });
        return resp;
    }).catch(err => {
        console.error(`[FETCH] ERROR:`, args[0], err);
        throw err;
    });
};

// 4. PerformanceObserver para eventos de temporización
const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
        console.log(`[PERFORMANCE] ${entry.entryType}:`, {
            nombre: entry.name,
            tipo: entry.initiatorType,
            duracion: entry.duration.toFixed(2) + 'ms',
            inicio: entry.startTime.toFixed(2) + 'ms'
        });
    });
});

observer.observe({
    entryTypes: ['navigation', 'resource', 'paint', 'longtask']
});

// 5. Eventos específicos del document
document.addEventListener('readystatechange', () => {
    console.log(`[DOCUMENT] ReadyState: ${document.readyState}`);
});

// 6. Último evento: window.load
window.addEventListener('load', () => {
    console.log('[WINDOW] LOAD: Página completamente cargada', {
        recursosCargados: performance.getEntriesByType('resource').length,
        tiempoTotal: performance.timing.loadEventEnd - performance.timing.navigationStart + 'ms'
    });

    // Desconectar observer después de load
    observer.disconnect();
});

// 7. Capturar errores no capturados
window.onerror = function (message, source, lineno, colno, error) {
    console.error('[ERROR GLOBAL]', { message, source, lineno, colno, error });
};

console.log('🔍 MONITOREO ACTIVADO: Todos los eventos serán registrados');