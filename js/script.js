// Funciones para manejar la apertura de documentos PDF

// Función para abrir el Protocolo Normal
function openProtocol() {
    const protocolUrl = './documents/Protocolo y normas de seguridad de los laboratorios 07-08-2025.pdf';
    
    // Verificar si el archivo existe antes de intentar abrirlo
    fetch(protocolUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // Si el archivo existe, abrirlo en una nueva pestaña
                window.open(protocolUrl, '_blank');
            } else {
                // Si no existe, mostrar mensaje informativo
                showNotification('El documento "Protocolo Normal" estará disponible próximamente.', 'info');
            }
        })
        .catch(() => {
            // En caso de error, mostrar mensaje informativo
            showNotification('El documento "Protocolo Normal" estará disponible próximamente.', 'info');
        });
}

// Función para abrir el Manual General de Laboratorio
function openManual() {
    const manualUrl = './documents/Manual General de los labrs.2025.pdf';
    
    // Verificar si el archivo existe antes de intentar abrirlo
    fetch(manualUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // Si el archivo existe, abrirlo en una nueva pestaña
                window.open(manualUrl, '_blank');
            } else {
                // Si no existe, mostrar mensaje informativo
                showNotification('El documento "Manual General de Laboratorio" estará disponible próximamente.', 'info');
            }
        })
        .catch(() => {
            // En caso de error, mostrar mensaje informativo
            showNotification('El documento "Manual General de Laboratorio" estará disponible próximamente.', 'info');
        });
}

// Mensajes dinámicos para el personaje UCT
const speechMessages = [
    '¡Hola! Recuerda revisar los protocolos antes de ingresar al laboratorio. ¡La seguridad es lo primero! 🧪⚗️',
    '¡Bienvenidos estudiantes! No olviden leer el manual general antes de usar cualquier equipo. 📚✨',
    '¡Importante! Siempre sigan las normas de seguridad para un aprendizaje exitoso. 🛡️🎓',
    '¡Hola UCT! Los protocolos están aquí para protegerlos. ¡Léanlos con atención! 👨‍🔬👩‍🔬',
    '¡Recuerden! Un laboratorio seguro es un laboratorio productivo. ¡Sigan las reglas! 🔬💡'
];

let currentMessageIndex = 0;

// Función para cambiar el mensaje de la burbuja de diálogo
function changeSpeechMessage() {
    const speechText = document.querySelector('.speech-text');
    if (speechText) {
        // Agregar efecto de desvanecimiento
        speechText.style.opacity = '0';
        
        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % speechMessages.length;
            speechText.textContent = speechMessages[currentMessageIndex];
            speechText.style.opacity = '1';
        }, 300);
    }
}

// Función para mostrar notificaciones al usuario
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'info' ? 'ℹ️' : '⚠️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">×</button>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                max-width: 400px;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification-info {
                border-left: 4px solid #010d4f;
            }
            
            .notification-content {
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-icon {
                font-size: 20px;
            }
            
            .notification-message {
                flex: 1;
                color: #333;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .notification-close:hover {
                background-color: #f0f0f0;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification.closing {
                animation: slideOut 0.3s ease-in;
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar notificación al DOM
    document.body.appendChild(notification);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, 5000);
}

// Función para cerrar notificaciones
function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.classList.add('closing');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Función para crear la carpeta de documentos y archivos de ejemplo
function initializeDocuments() {
    // Esta función se puede usar para inicializar documentos de ejemplo
    // En un entorno real, los PDFs se subirían manualmente a la carpeta documents/
    console.log('Sistema de documentos inicializado');
    console.log('Para agregar documentos PDF:');
    console.log('1. Crea una carpeta llamada "documents" en la raíz del proyecto');
    console.log('2. Agrega los archivos PDF con los nombres:');
    console.log('   - protocolo-normal.pdf');
    console.log('   - manual-general-laboratorio.pdf');
}

// Crear partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Duración de animación aleatoria
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Toggle de modo oscuro/claro
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Efecto de transición suave
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme, iconElement) {
    iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Animaciones de entrada con Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos con animaciones
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Efectos de hover mejorados
function initHoverEffects() {
    // Efecto de paralaje suave en la sección principal
    const welcomeSection = document.querySelector('.welcome-section');
    
    if (welcomeSection) {
        welcomeSection.addEventListener('mousemove', (e) => {
            const rect = welcomeSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            welcomeSection.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        welcomeSection.addEventListener('mouseleave', () => {
            welcomeSection.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
    }
}

// Contador de visitas (simulado)
function initVisitCounter() {
    let visits = localStorage.getItem('visitCount') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('visitCount', visits);
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification(`¡Bienvenido! Esta es tu visita número ${visits}`, 'info');
    }, 2000);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeDocuments();
    
    // Inicializar todas las funcionalidades
    createParticles();
    initThemeToggle();
    initScrollAnimations();
    initHoverEffects();
    initVisitCounter();
    
    // Inicializar el cambio automático de mensajes del personaje
    const speechText = document.querySelector('.speech-text');
    if (speechText) {
        // Agregar transición suave al texto
        speechText.style.transition = 'opacity 0.3s ease-in-out';
        
        // Cambiar mensaje cada 4 segundos
        setInterval(changeSpeechMessage, 4000);
        
        // También permitir cambio manual al hacer clic en la burbuja
        const speechBubble = document.querySelector('.speech-bubble');
        if (speechBubble) {
            speechBubble.addEventListener('click', changeSpeechMessage);
            speechBubble.style.cursor = 'pointer';
        }
    }
    
    // Agregar eventos a los botones
    const protocolBtn = document.querySelector('.btn-primary');
    const manualBtn = document.querySelector('.btn-secondary');
    
    if (protocolBtn) {
        protocolBtn.addEventListener('click', openProtocol);
    }
    
    if (manualBtn) {
        manualBtn.addEventListener('click', openManual);
    }
    
    // Agregar efectos de hover a los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Agregar efecto de clic
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'translateY(0)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });
    
    // Animación de carga
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Ajustar elementos si es necesario en diferentes tamaños de pantalla
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        // Lógica adicional para responsive si es necesaria
    }
});

// Exportar funciones para uso global
window.openProtocol = openProtocol;
window.openManual = openManual;
window.closeNotification = closeNotification;