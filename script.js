// Variables para controlar el estado de la navegación
let historyStack = [];
let currentIndex = -1;

document.querySelectorAll('#sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo(this.getAttribute('href').substring(1)); // Pasa el ID sin el '#'
    });
});

function navigateTo(sectionId) {
    let section = document.querySelector(`#${sectionId}`);
    if (section) {
        // Ocultar la sección actual
        let currentActive = document.querySelector('#content > div.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }

        // Mostrar la nueva sección
        section.classList.add('active');

        // Actualizar la barra de búsqueda con la ruta
        updateSearchBar(sectionId);

        // Actualizar el historial
        if (currentIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, currentIndex + 1);
        }
        historyStack.push(sectionId);
        currentIndex++;
    }
}

// Botones de navegación adelante y atrás
const backButton = document.querySelector('.nav-button:nth-child(1)');
const forwardButton = document.querySelector('.nav-button:nth-child(2)');

backButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        navigateTo(historyStack[currentIndex]);
    }
});

forwardButton.addEventListener('click', () => {
    if (currentIndex < historyStack.length - 1) {
        currentIndex++;
        navigateTo(historyStack[currentIndex]);
    }
});

// Función para inicializar la vista en el primer acceso o recarga
function initializeView() {
    if (historyStack.length === 0) {  // Si no hay historial, carga una vista por defecto
        navigateTo('personal');  // Cambia 'personal' por el ID de tu sección inicial
    } else {
        navigateTo(historyStack[currentIndex]);  // Carga la última vista activa
    }
}

window.onload = initializeView;

function toggleDetails(detailsId) {
    let details = document.getElementById(detailsId);
    let allDetails = document.querySelectorAll('.details');
    
    // Ocultar todas las tarjetas de detalles
    allDetails.forEach(detail => {
        if (detail.id !== detailsId) {
            detail.classList.remove('active');
        }
    });

    // Alternar la visibilidad de la tarjeta seleccionada
    if (details.classList.contains('active')) {
        details.classList.remove('active');
    } else {
        details.classList.add('active');
    }
}

function updateSearchBar(sectionId) {
    const searchBar = document.querySelector('.search-bar');
    searchBar.value = `Ruta: ${sectionId.replace(/-/g, ' ')}`;
}
