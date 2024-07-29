// auth.js
const PASSWORD = 'radish';
const LOGIN_REDIRECT_PAGE = 'index.html';
const LOGIN_PAGE = 'login.html';
const LOGIN_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

function login() {
    const password = document.getElementById('password').value;
    if (password === PASSWORD) {
        const expiration = Date.now() + LOGIN_DURATION;
        sessionStorage.setItem('authExpiration', expiration);
        window.location.href = LOGIN_REDIRECT_PAGE;
    } else {
        alert('Incorrect password');
    }
}

function isAuthenticated() {
    const authExpiration = sessionStorage.getItem('authExpiration');
    if (authExpiration) {
        if (Date.now() < parseInt(authExpiration)) {
            // Renew the expiration time on every check
            const newExpiration = Date.now() + LOGIN_DURATION;
            sessionStorage.setItem('authExpiration', newExpiration);
            return true;
        } else {
            sessionStorage.removeItem('authExpiration');
        }
    }
    return false;
}

function checkAuth() {
    if (!isAuthenticated()) {
        // Store the current URL in sessionStorage before redirecting
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = LOGIN_PAGE;
    }
}

// Add this function to handle redirection after login
function redirectAfterLogin() {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    } else {
        window.location.href = LOGIN_REDIRECT_PAGE;
    }
}

function login() {
    const password = document.getElementById('password').value;
    if (password === PASSWORD) {
        const expiration = Date.now() + LOGIN_DURATION;
        sessionStorage.setItem('authExpiration', expiration);
        updateLoginButtons(); // Added this line
        window.location.href = LOGIN_REDIRECT_PAGE;
    } else {
        alert('Incorrect password');
    }
}

function logout() {
    sessionStorage.removeItem('authExpiration');
    sessionStorage.removeItem('redirectAfterLogin');
    updateLoginButtons(); // Added this line
    window.location.href = LOGIN_PAGE;
}

function updateLoginButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn && logoutBtn) {
        if (isAuthenticated()) {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Logged';
            logoutBtn.style.display = 'inline-block';
        } else {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Log In';
            logoutBtn.style.display = 'none';
        }
    }
    updateNavLinks(); // Add this line
}

function handleLogin() {
    if (!isAuthenticated()) {
        window.location.href = LOGIN_PAGE;
    }
}

function updateNavLinks() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const isLoggedIn = isAuthenticated();

    navLinks.forEach(link => {
        if (isLoggedIn) {
            link.classList.remove('disabled');
            link.removeAttribute('tabindex');
            link.style.pointerEvents = 'auto';
        } else {
            link.classList.add('disabled');
            link.setAttribute('tabindex', '-1');
            link.style.pointerEvents = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn && logoutBtn) {
        loginBtn.addEventListener('click', handleLogin);
        logoutBtn.addEventListener('click', logout);
        updateLoginButtons();
    }
    updateNavLinks(); // Add this line
});