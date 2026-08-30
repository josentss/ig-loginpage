// ============================================
// Instagram Login – comportamiento
// ============================================

const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const fbBtn = document.getElementById('fbLogin');
const createBtn = document.getElementById('createAccount');

toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.setAttribute(
    'aria-label',
    isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
  );
});

function updateButtonState() {
  const hasUser = usernameInput.value.trim().length > 0;
  const hasPass = passwordInput.value.length > 0;
  loginBtn.disabled = !(hasUser && hasPass);
}

usernameInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
updateButtonState();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (loginBtn.disabled) return;

  const original = loginBtn.textContent;
  loginBtn.disabled = true;
  loginBtn.textContent = 'Iniciando sesión...';

  setTimeout(() => {
    loginBtn.textContent = original;
    updateButtonState();
    console.log('Login attempt:', {
      username: usernameInput.value.trim(),
      password: '***'
    });
  }, 1400);
});

fbBtn.addEventListener('click', () => console.log('Facebook login'));
createBtn.addEventListener('click', () => console.log('Create account'));

document.querySelector('.forgot')?.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Forgot password');
});

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') form.requestSubmit();
});
