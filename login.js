// login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginCancelBtn = document.getElementById('login-cancel-btn');
    const loginForm = document.getElementById('login-form');
    const modalOverlay = document.getElementById('modal-overlay');
    const loginSubmitBtn = document.getElementById('login-btn-submit');
    const loginSuccessMessage = document.getElementById('login-success-message');
    const loginErrorMessage = document.getElementById('login-error-message');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');

    // Show Login Form
    loginBtn.addEventListener('click', function() {
        loginForm.style.display = 'block';
        modalOverlay.style.display = 'block';
    });

    // Hide Login Form
    loginCancelBtn.addEventListener('click', function() {
        loginForm.style.display = 'none';
        modalOverlay.style.display = 'none';
        clearLoginForm();
    });

    // Form Input Validation
    function validateLoginInputs() {
        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();
        loginSubmitBtn.disabled = !email || !password;
    }

    // Event Listeners for Inputs
    loginEmailInput.addEventListener('input', validateLoginInputs);
    loginPasswordInput.addEventListener('input', validateLoginInputs);

    // Login Button Click Event
    loginSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        const account = accounts.find(acc => acc.email === email);

        if (account) {
            if (account.password === password) {
                loginSuccessMessage.innerText = "You are successfully logged in!";
                loginSuccessMessage.style.display = 'block';
                loginErrorMessage.style.display = 'none';
            } else {
                loginErrorMessage.innerText = "Incorrect password.";
                loginErrorMessage.style.display = 'block';
                loginSuccessMessage.style.display = 'none';
            }
        } else {
            loginErrorMessage.innerText = "User not found. Register?";
            loginErrorMessage.style.display = 'block';
            loginSuccessMessage.style.display = 'none';
        }
    });

    function clearLoginForm() {
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
        loginSuccessMessage.style.display = 'none';
        loginErrorMessage.style.display = 'none';
    }
});
