// signup.js

document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const signupCancelBtn = document.getElementById('signup-cancel-btn');
    const signupForm = document.getElementById('signup-form');
    const modalOverlay = document.getElementById('modal-overlay');
    const registerBtn = document.getElementById('register-btn');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('success-message');

    // Show Signup Form
    signupBtn.addEventListener('click', function() {
        signupForm.style.display = 'block';
        modalOverlay.style.display = 'block';
    });

    // Hide Signup Form
    signupCancelBtn.addEventListener('click', function() {
        signupForm.style.display = 'none';
        modalOverlay.style.display = 'none';
        clearForm();
    });

    // Form Input Validation
    function validateInputs() {
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);

        // Enable or disable Register button
        if (cpf && isValidEmail && isValidPassword) {
            registerBtn.removeAttribute('disabled');
            registerBtn.classList.remove('disabled');
        } else {
            registerBtn.setAttribute('disabled', 'true');
            registerBtn.classList.add('disabled');
        }
    }

    // Event Listeners for Inputs
    cpfInput.addEventListener('input', validateInputs);
    emailInput.addEventListener('input', validateInputs);
    passwordInput.addEventListener('input', validateInputs);

    // Register Button Click Event
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Store in Local Storage
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts.push({ cpf, email, password });
        localStorage.setItem('accounts', JSON.stringify(accounts));

        // Notify User
        successMessage.style.display = 'block';
        setTimeout(() => {
            signupForm.style.display = 'none';
            modalOverlay.style.display = 'none';
            clearForm();
        }, 2000);
    });

    function clearForm() {
        cpfInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        registerBtn.setAttribute('disabled', 'true');
        registerBtn.classList.add('disabled');
        successMessage.style.display = 'none';
    }
});
