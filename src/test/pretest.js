(() => {
    // 1. Crear elementos del progressbar dinámicamente
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'load-progress';
    progressBar.style.width = '0%';

    const progressText = document.createElement('span');
    progressText.className = 'progress-text';
    progressText.textContent = '0%';

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    document.body.prepend(progressContainer);

    // 2. Estilos inline para evitar FOUC
    const styles = document.createElement('style');
    styles.textContent = `
    #end-load {
    animation: loadAnimation 1s ease-in-out forwards;
  }

  @keyframes loadAnimation {
    99% {
      transform: translateY(-100vh);
    }
    100% {
      display: none;
    }
  }

  body {
    overflow: hidden;
  }

  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #dddddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    content-visibility: visible !important;
    contain-intrinsic-size: 4px;
  }

  .progress-bar {
    width: 0%;
    height: 4px;
    background: #02286e;
    transition: width 0.3s ease-out;
    border-radius: 2px;
  }

  .progress-text {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  `;
    document.head.appendChild(styles);

    // 3. Lógica de tracking
    const resourceMap = new Map();
    let totalResources = 0;
    let loadedResources = 0;

    const processResource = (entry) => {
        if (!isValidResource(entry) || resourceMap.has(entry.name)) return;

        resourceMap.set(entry.name, false);
        totalResources++;

        if (entry.duration > 0 && entry.responseStatus !== 404) {
            resourceMap.set(entry.name, true);
            loadedResources++;
        }

        updateProgress();
    };

    const trackElement = (el) => {
        const src = el.src || el.href;
        if (!src || resourceMap.has(src)) return;

        resourceMap.set(src, false);
        totalResources++;
        updateProgress();

        const onLoad = () => {
            resourceMap.set(src, true);
            loadedResources++;
            updateProgress();
            el.removeEventListener('load', onLoad);
        };

        el.addEventListener('load', onLoad);
    };

    const updateProgress = () => {
        const progress = totalResources > 0
            ? Math.min((loadedResources / totalResources) * 100, 100)
            : 0;

        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;

    };

    // 4. Observadores mejorados
    const resourceObserver = new PerformanceObserver(list => {
        list.getEntriesByType('resource').forEach(processResource);
    });

    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Solo elementos
                    if (['IMG', 'SCRIPT', 'LINK'].includes(node.tagName)) trackElement(node);
                    node.querySelectorAll?.('img, script[src], link[rel="stylesheet"]').forEach(trackElement);
                }
            });
        });
    });

    // 5. Inicialización precisa
    resourceObserver.observe({ type: 'resource', buffered: true });
    mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Procesar recursos cargados antes del observer
    performance.getEntriesByType('resource').forEach(processResource);

    // Trackear elementos ya presentes
    document.querySelectorAll('img, script[src], link[rel="stylesheet"]').forEach(trackElement);
    updateProgress();

    // 6. Manejo de edge cases
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadedResources = totalResources;
            updateProgress();
        }, 1500);
        setTimeout(() => {
            progressContainer.id = "end-load"
        }, 1800);
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 2800);
    });

    // Helpers
    function isValidResource(entry) {
        return !entry.name.startsWith('data:') &&
            !entry.name.includes('chrome-extension') &&
            !entry.name.includes('astro-dev-toolbar');
    }
})();
