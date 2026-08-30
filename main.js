// ===============================================
// ELEMENTOS DEL DOM
// ===============================================

const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelectorAll('.carousel-image');
const eyeIcon = document.querySelector('.eye-icon');

// ===============================================
// VALIDACIÓN Y FUNCIONALIDAD
// ===============================================

/**
 * Valida si el email es válido
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida si es un número de teléfono válido
 * @param {string} phone - Teléfono a validar
 * @returns {boolean}
 */
function isValidPhone(phone) {
    const phoneRegex = /^\d{7,}$/; // Al menos 7 dígitos
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Valida si es un nombre de usuario válido (3-30 caracteres, sin espacios)
 * @param {string} username - Usuario a validar
 * @returns {boolean}
 */
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
    return usernameRegex.test(username);
}

/**
 * Valida el campo de usuario
 * @returns {boolean}
 */
function validateUsername() {
    const value = usernameInput.value.trim();
    const usernameGroup = usernameInput.parentElement.parentElement;
    
    if (!value) {
        usernameError.textContent = 'Este campo no puede estar vacío';
        usernameGroup.classList.add('error');
        return false;
    }
    
    // Verifica si es email, teléfono o usuario
    const isEmail = isValidEmail(value);
    const isPhone = isValidPhone(value);
    const isUsername = isValidUsername(value);
    
    if (!isEmail && !isPhone && !isUsername) {
        usernameError.textContent = 'Ingresa un email, nombre de usuario o número de teléfono válido';
        usernameGroup.classList.add('error');
        return false;
    }
    
    usernameGroup.classList.remove('error');
    usernameError.textContent = '';
    return true;
}

/**
 * Valida el campo de contraseña
 * @returns {boolean}
 */
function validatePassword() {
    const value = passwordInput.value;
    const passwordGroup = passwordInput.parentElement.parentElement;
    
    if (!value) {
        passwordError.textContent = 'Ingresa tu contraseña';
        passwordGroup.classList.add('error');
        return false;
    }
    
    if (value.length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        passwordGroup.classList.add('error');
        return false;
    }
    
    passwordGroup.classList.remove('error');
    passwordError.textContent = '';
    return true;
}

/**
 * Toggle para mostrar/ocultar contraseña
 */
togglePasswordBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.opacity = '1';
    } else {
        passwordInput.type = 'password';
        eyeIcon.style.opacity = '0.6';
    }
});

/**
 * Validación en tiempo real
 */
usernameInput.addEventListener('blur', validateUsername);
usernameInput.addEventListener('input', function() {
    if (usernameInput.parentElement.parentElement.classList.contains('error')) {
        validateUsername();
    }
});

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', function() {
    if (passwordInput.parentElement.parentElement.classList.contains('error')) {
        validatePassword();
    }
});

/**
 * Manejo del envío del formulario
 */
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Valida ambos campos
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    
    if (isUsernameValid && isPasswordValid) {
        // Aquí iría el envío a un servidor
        console.log('Formulario válido. Datos:');
        console.log('Usuario:', usernameInput.value);
        console.log('Contraseña:', passwordInput.value);
        
        // Simulación de carga
        const loginBtn = form.querySelector('.login-btn');
        const originalText = loginBtn.textContent;
        loginBtn.disabled = true;
        loginBtn.textContent = 'Iniciando sesión...';
        
        // Simula una petición al servidor (reemplaza con tu API real)
        setTimeout(() => {
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
            alert('¡Inicio de sesión exitoso! (Simulado)');
            // Redirige o realiza otra acción
        }, 2000);
    }
});

// ===============================================
// CAROUSEL DE IMÁGENES DEL TELÉFONO
// ===============================================

let currentImageIndex = 0;
const autoplayInterval = 4000; // Cambia imagen cada 4 segundos

/**
 * Cambia a la siguiente imagen en el carousel
 */
function nextCarouselImage() {
    carouselImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    carouselImages[currentImageIndex].classList.add('active');
}

// Inicia el autoplay del carousel
if (carouselImages.length > 0) {
    setInterval(nextCarouselImage, autoplayInterval);
}

// ===============================================
// ANIMACIONES Y EFECTOS
// ===============================================

/**
 * Anima los elementos cuando entran en el viewport
 */
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa elementos con clase 'animated'
    document.querySelectorAll('.animated').forEach(el => {
        observer.observe(el);
    });
}

// Inicializa observador cuando el DOM está listo
document.addEventListener('DOMContentLoaded', observeElements);

// ===============================================
// EFECTOS DE INTERACCIÓN
// ===============================================

/**
 * Agrega efecto de ripple a los botones (opcional)
 */
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Aplica efecto ripple a botones (opcional)
// document.querySelectorAll('.login-btn, .facebook-login-btn').forEach(addRippleEffect);

// ===============================================
// MANEJO DE EVENTO: ENLACE OLVIDÉ CONTRASEÑA
// ===============================================

const forgotLink = document.querySelector('.forgot-link');
if (forgotLink) {
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Te enviaremos un email para recuperar tu contraseña (Simulado)');
        // Redirige a página de recuperación de contraseña
        // window.location.href = '/forgot-password';
    });
}

// ===============================================
// MANEJO DE EVENTO: ENLACE REGISTRO
// ===============================================

const signupLink = document.querySelector('.signup-link');
if (signupLink) {
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Te redirigiremos a la página de registro (Simulado)');
        // window.location.href = '/signup';
    });
}

// ===============================================
// MANEJO DE EVENTO: LOGIN CON FACEBOOK
// ===============================================

const facebookBtn = document.querySelector('.facebook-login-btn');
if (facebookBtn) {
    facebookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Iniciando sesión con Facebook (Simulado)');
        // Aquí iría la lógica de OAuth de Facebook
        // FB.login() or similar
    });
}

// ===============================================
// KEYBOARD SHORTCUTS
// ===============================================

/**
 * Permite presionar Enter en el campo de contraseña para enviar
 */
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
});

// ===============================================
// ACCESIBILIDAD
// ===============================================

/**
 * Mejora la accesibilidad del formulario
 */
function improveAccessibility() {
    // Agrega atributos de accesibilidad
    form.setAttribute('novalidate', 'true');
    
    // Asegura que los inputs tengan labels asociados
    usernameInput.setAttribute('aria-label', 'Número de celular, nombre de usuario o correo electrónico');
    passwordInput.setAttribute('aria-label', 'Contraseña');
    
    // Mensajes de error asociados
    usernameError.setAttribute('aria-live', 'polite');
    passwordError.setAttribute('aria-live', 'polite');
}

improveAccessibility();

// ===============================================
// MONITOREO DE CAMBIOS
// ===============================================

/**
 * Log para debugging (remover en producción)
 */
function logFormState() {
    console.log('Estado del formulario:');
    console.log('Usuario:', usernameInput.value);
    console.log('Contraseña ingresada:', passwordInput.value ? '***' : 'vacía');
}

// Descomenta para debug
// form.addEventListener('change', logFormState);
