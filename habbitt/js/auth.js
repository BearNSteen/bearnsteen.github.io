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

function logout() {
    sessionStorage.removeItem('authExpiration');
    window.location.href = LOGIN_PAGE;
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