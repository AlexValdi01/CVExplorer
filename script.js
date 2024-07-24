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

        // Actualizar la barra de búsqueda con la ruta actual
        document.getElementById('path-display').textContent = `/home/${sectionId}`;

        // Actualizar el historial
        if (currentIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, currentIndex + 1);
        }
        historyStack.push(sectionId);
        currentIndex++;
    }
}

// Botones de navegación adelante y atrás
const backButton = document.getElementById('back-button');
const forwardButton = document.getElementById('forward-button');

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

function toggleDetails(detailId) {
    const detailElement = document.getElementById(detailId);
    const allDetails = document.querySelectorAll('.details');

    allDetails.forEach(detail => {
        if (detail !== detailElement) {
            detail.classList.remove('active');
        }
    });

    detailElement.classList.toggle('active');
}

// Función para inicializar la vista en el primer acceso o recarga
function initializeView() {
    if (historyStack.length === 0) {  // Si no hay historial, carga una vista por defecto
        navigateTo('personal');  // Cambia 'personal' por el ID de tu sección inicial
    } else {
        navigateTo(historyStack[currentIndex]);  // Carga la última vista activa
    }
}

window.onload = initializeView;

// Cerrar documento
document.querySelectorAll('.document-button.close').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.details').classList.remove('active');
    });
});
