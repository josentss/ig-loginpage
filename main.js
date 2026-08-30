// ============================================
// Instagram Login – comportamiento básico
// ============================================

const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const fbBtn = document.getElementById('fbLogin');
const createBtn = document.getElementById('createAccount');

// Toggle mostrar / ocultar contraseña
toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
});

// Habilitar botón solo cuando hay texto en ambos campos (comportamiento similar al oficial)
function updateButtonState() {
  const hasUser = usernameInput.value.trim().length > 0;
  const hasPass = passwordInput.value.length > 0;
  loginBtn.disabled = !(hasUser && hasPass);
}

usernameInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
updateButtonState(); // estado inicial

// Submit (simulado)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (loginBtn.disabled) return;

  const original = loginBtn.textContent;
  loginBtn.disabled = true;
  loginBtn.textContent = 'Iniciando sesión...';

  // Simulación de petición
  setTimeout(() => {
    loginBtn.textContent = original;
    loginBtn.disabled = false;
    updateButtonState();
    // Aquí iría la lógica real de autenticación
    console.log('Login attempt:', {
      username: usernameInput.value.trim(),
      password: '***'
    });
  }, 1500);
});

// Facebook login (placeholder)
fbBtn.addEventListener('click', () => {
  console.log('Facebook login clicked');
});

// Crear cuenta (placeholder)
createBtn.addEventListener('click', () => {
  console.log('Create account clicked');
});

// Enter en contraseña envía el form
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    form.requestSubmit();
  }
});
