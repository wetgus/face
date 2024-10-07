// signup.js

document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const signupForm = document.getElementById('signup-form');
    const modalOverlay = document.getElementById('modal-overlay');
    const registerBtn = document.getElementById('register-btn');
    const successMessage = document.getElementById('success-message');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Show Signup Form
    signupBtn.addEventListener('click', function() {
        signupForm.style.display = 'block';
        modalOverlay.style.display = 'block';
    });

    // Hide Signup Form
    cancelBtn.addEventListener('click', function() {
        signupForm.style.display = 'none';
        modalOverlay.style.display = 'none';
        clearForm();
    });

    // CPF Validation
    function isValidCPF(cpf) {
        // Implement the logic to validate Brazilian CPF
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    }

    // Email Validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Password Validation
    function isValidPassword(password) {
        const regex = /^[a-zA-Z0-9]{8,16}$/;
        return regex.test(password);
    }

    // Form Input Validation
    function validateInputs() {
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (isValidCPF(cpf) && isValidEmail(email) && isValidPassword(password)) {
            registerBtn.removeAttribute('disabled');
        } else {
            registerBtn.setAttribute('disabled', 'true');
        }
    }

    // Event Listeners for Inputs
    cpfInput.addEventListener('input', validateInputs);
    emailInput.addEventListener('input', validateInputs);
    passwordInput.addEventListener('input', validateInputs);

    // Register Button Click Event
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Create Account Record
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const account = { cpf, email, password };
        localStorage.setItem(email, JSON.stringify(account));

        // Show Success Message
        successMessage.style.display = 'block';
        clearForm();
    });

    // Clear Form Function
    function clearForm() {
        cpfInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        registerBtn.setAttribute('disabled', 'true');
        successMessage.style.display = 'none';
        signupForm.style.display = 'none';
        modalOverlay.style.display = 'none';
    }
});
